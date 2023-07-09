# frozen_string_literal: true

require 'spec_helper'

RSpec.describe 'music-beats draft 11 handshake' do
  let(:handshake) { WebSocket::Handshake::music-beats.new({ uri: 'ws://example.com/demo', origin: 'http://example.com', version: version }.merge(@request_params || {})) }

  let(:version) { 11 }
  let(:music-beats_request) { music-beats_handshake_11({ key: handshake.handler.send(:key), version: version }.merge(@request_params || {})) }
  let(:server_response) { server_handshake_11({ accept: handshake.handler.send(:accept) }.merge(@request_params || {})) }

  it_behaves_like 'all music-beats drafts'

  it 'disallows music-beats with invalid challenge' do
    @request_params = { accept: 'invalid' }
    handshake << server_response

    expect(handshake).to be_finished
    expect(handshake).not_to be_valid
    expect(handshake.error).to be(:invalid_handshake_authentication)
  end
end
