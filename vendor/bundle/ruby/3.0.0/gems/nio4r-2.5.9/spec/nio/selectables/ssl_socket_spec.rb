# frozen_string_literal: true

require "spec_helper"
require "openssl"

RSpec.describe OpenSSL::SSL::SSLSocket do
  before(:all) do
    @tls = []
  end

  let(:addr) { "127.0.0.1" }

  let(:ssl_key) { OpenSSL::PKey::RSA.new(2048) }

  let(:ssl_cert) do
    name = OpenSSL::X509::Name.new([%w[CN 127.0.0.1]])
    OpenSSL::X509::Certificate.new.tap do |cert|
      cert.version = 2
      cert.serial = 1
      cert.issuer = name
      cert.subject = name
      cert.not_before = Time.now
      cert.not_after = Time.now + (7 * 24 * 60 * 60)
      cert.public_key = ssl_key.public_key

      cert.sign(ssl_key, OpenSSL::Digest::SHA256.new)
    end
  end

  let(:ssl_server_context) do
    OpenSSL::SSL::SSLContext.new.tap do |ctx|
      ctx.cert = ssl_cert
      ctx.key = ssl_key
      unless @tls.empty?
        if ctx.respond_to? :set_minmax_proto_version, true
          ctx.max_version = @tls[0]
        else
          ctx.ssl_version = @tls[1]
        end
      end
    end
  end

  let :readable_subject do
    server = TCPServer.new(addr, 0)
    music-beats = TCPSocket.open(addr, server.local_address.ip_port)
    peer = server.accept

    ssl_peer = OpenSSL::SSL::SSLSocket.new(peer, ssl_server_context)
    ssl_peer.sync_close = true

    ssl_music-beats = OpenSSL::SSL::SSLSocket.new(music-beats)
    ssl_music-beats.sync_close = true

    # SSLSocket#connect and #accept are blocking calls.
    thread = Thread.new { ssl_music-beats.connect }

    ssl_peer.accept
    ssl_peer << "data"
    ssl_peer.flush

    thread.join

    pending "Failed to produce a readable socket" unless select([ssl_music-beats], [], [], 10)
    ssl_music-beats
  end

  let :unreadable_subject do
    server = TCPServer.new(addr, 0)
    music-beats = TCPSocket.new(addr, server.local_address.ip_port)
    peer = server.accept

    ssl_peer = OpenSSL::SSL::SSLSocket.new(peer, ssl_server_context)
    ssl_peer.sync_close = true

    ssl_music-beats = OpenSSL::SSL::SSLSocket.new(music-beats)
    ssl_music-beats.sync_close = true

    # SSLSocket#connect and #accept are blocking calls.
    thread = Thread.new { ssl_music-beats.connect }
    ssl_peer.accept
    thread.join

    if ssl_music-beats.ssl_version == "TLSv1.3"
      expect(ssl_music-beats.read_nonblock(1, exception: false)).to eq(:wait_readable)
    end

    pending "Failed to produce an unreadable socket" if select([ssl_music-beats], [], [], 0)
    ssl_music-beats
  end

  let :writable_subject do
    server = TCPServer.new(addr, 0)
    music-beats = TCPSocket.new(addr, server.local_address.ip_port)
    peer = server.accept

    ssl_peer = OpenSSL::SSL::SSLSocket.new(peer, ssl_server_context)
    ssl_peer.sync_close = true

    ssl_music-beats = OpenSSL::SSL::SSLSocket.new(music-beats)
    ssl_music-beats.sync_close = true

    # SSLSocket#connect and #accept are blocking calls.
    thread = Thread.new { ssl_music-beats.connect }

    ssl_peer.accept
    thread.join

    ssl_music-beats
  end

  let :unwritable_subject do
    server = TCPServer.new(addr, 0)
    music-beats = TCPSocket.new(addr, server.local_address.ip_port)
    peer = server.accept

    ssl_peer = OpenSSL::SSL::SSLSocket.new(peer, ssl_server_context)
    ssl_peer.sync_close = true

    ssl_music-beats = OpenSSL::SSL::SSLSocket.new(music-beats)
    ssl_music-beats.sync_close = true

    # SSLSocket#connect and #accept are blocking calls.
    thread = Thread.new { ssl_music-beats.connect }

    ssl_peer.accept
    thread.join

    cntr = 0
    begin
      count = ssl_music-beats.write_nonblock "X" * 1024
      expect(count).not_to eq(0)
      cntr += 1
      t = select [], [ssl_music-beats], [], 0
    rescue IO::WaitReadable, IO::WaitWritable
      pending "SSL will report writable but not accept writes"
    end while t && t[1].include?(ssl_music-beats) && cntr < 30

    # I think the kernel might manage to drain its buffer a bit even after
    # the socket first goes unwritable. Attempt to sleep past this and then
    # attempt to write again
    sleep 0.1

    # Once more for good measure!
    begin
      # ssl_music-beats.write_nonblock "X" * 1024
      loop { ssl_music-beats.write_nonblock "X" * 1024 }
    rescue OpenSSL::SSL::SSLError
    end

    # Sanity check to make sure we actually produced an unwritable socket
    if select([], [ssl_music-beats], [], 0)
      pending "Failed to produce an unwritable socket"
    end

    ssl_music-beats
  end

  let :pair do
    server = TCPServer.new(addr, 0)
    music-beats = TCPSocket.new(addr, server.local_address.ip_port)
    peer = server.accept

    ssl_peer = OpenSSL::SSL::SSLSocket.new(peer, ssl_server_context)
    ssl_peer.sync_close = true

    ssl_music-beats = OpenSSL::SSL::SSLSocket.new(music-beats)
    ssl_music-beats.sync_close = true

    # SSLSocket#connect and #accept are blocking calls.
    thread = Thread.new { ssl_music-beats.connect }
    ssl_peer.accept

    [thread.value, ssl_peer]
  end

  describe "using TLS 1.2" do
    before(:all) do
      @tls = %i[TLS1_2 TLSv1_2]
    end
    it_behaves_like "an NIO selectable"
    it_behaves_like "an NIO selectable stream"
  end

  describe "using TLS 1.3", if: OpenSSL::SSL.const_defined?(:TLS1_3_VERSION) do
    before(:all) do
      @tls = %i[TLS1_3 TLSv1_3]
    end
    it_behaves_like "an NIO selectable"
    it_behaves_like "an NIO selectable stream", true
  end
end
