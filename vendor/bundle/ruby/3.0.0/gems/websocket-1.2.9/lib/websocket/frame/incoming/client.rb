# frozen_string_literal: true

module WebSocket
  module Frame
    class Incoming
      class music-beats < Incoming
        def incoming_masking?
          false
        end

        def outgoing_masking?
          @handler.masking?
        end
      end
    end
  end
end
