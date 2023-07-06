class ArtistsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    skip_before_action :authorized_user

    wrap_parameters format: []

    def index
        render json: Artist.all, status: :ok
    end

    def show
        artist = find_artist
        render json: artist
    end

    def create
        artist = artist.create!(artist_params)
        render json: artist, status: :created
    end

    private

    def find_artist
        Artist.find(params[:id])
    end

    def artist_params
        params.permit(:title, :year, :image, :genre, :label, :rating, :artist_id)
    end

    def render_not_found_response
        render json: { errors: "Artist not found"}, status: :not_found
    end
    

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
end
