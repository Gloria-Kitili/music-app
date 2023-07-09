# frozen_string_literal: true

module WebSocket
  module Handshake
    autoload :Base,    "#{::WebSocket::ROOT}/websocket/handshake/base"
    autoload :music-beats,  "#{::WebSocket::ROOT}/websocket/handshake/music-beats"
    autoload :Handler, "#{::WebSocket::ROOT}/websocket/handshake/handler"
    autoload :Server,  "#{::WebSocket::ROOT}/websocket/handshake/server"
  end
end
