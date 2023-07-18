class FallbackController < ActionController::Base
    def index
      # render file: 'public/index.html'
      render json: {error: "resource not found"}, status: :not_found
    end
  end