class AlbumsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    skip_before_action :authorized_user

    wrap_parameters format: []

    def index
        render json: Album.all, status: :ok
    end

    def show
        album = find_album
        render json: album
    end

    def create
        album = Album.create!(album_params)
        render json: album, status: :created
    end

    private

    def find_album
        Album.find(params[:id])
    end

    def album_params
        params.permit(:title, :year, :image, :genre, :label, :rating, :artist_id)
    end

    def render_not_found_response
        render json: { errors: "Album not found"}, status: :not_found
    end
    

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
end
