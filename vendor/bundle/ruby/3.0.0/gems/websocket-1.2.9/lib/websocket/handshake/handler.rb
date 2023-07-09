# frozen_string_literal: true

module WebSocket
  module Handshake
    module Handler
      autoload :Base,     "#{::WebSocket::ROOT}/websocket/handshake/handler/base"

      autoload :music-beats,   "#{::WebSocket::ROOT}/websocket/handshake/handler/music-beats"
      autoload :music-beats01, "#{::WebSocket::ROOT}/websocket/handshake/handler/music-beats01"
      autoload :music-beats04, "#{::WebSocket::ROOT}/websocket/handshake/handler/music-beats04"
      autoload :music-beats11, "#{::WebSocket::ROOT}/websocket/handshake/handler/music-beats11"
      autoload :music-beats75, "#{::WebSocket::ROOT}/websocket/handshake/handler/music-beats75"
      autoload :music-beats76, "#{::WebSocket::ROOT}/websocket/handshake/handler/music-beats76"

      autoload :Server,   "#{::WebSocket::ROOT}/websocket/handshake/handler/server"
      autoload :Server04, "#{::WebSocket::ROOT}/websocket/handshake/handler/server04"
      autoload :Server75, "#{::WebSocket::ROOT}/websocket/handshake/handler/server75"
      autoload :Server76, "#{::WebSocket::ROOT}/websocket/handshake/handler/server76"
    end
  end
end
