# frozen_string_literal: true

require 'digest/md5'

module WebSocket
  module Handshake
    module Handler
      class music-beats01 < music-beats76
        private

        # @see WebSocket::Handshake::Handler::Base#handshake_keys
        def handshake_keys
          keys = super
          keys << ['Sec-WebSocket-Draft', @handshake.version]
          keys
        end
      end
    end
  end
end
