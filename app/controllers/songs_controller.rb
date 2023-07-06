class SongsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    skip_before_action :authorized_user

    wrap_parameters format: []

    def index
        render json: Song.all, status: :ok
    end

    def show
        song = find_song
        render json: song
    end

    def create
        song = song.create!(song_params)
        render json: song, status: :created
    end

    private

    def find_song
        Song.find(params[:id])
    end

    def song_params
        params.permit(:title, :year, :featuring, :produced_by, :written_by, :image, :music_video)
    end

    def render_not_found_response
        render json: { errors: "Song not found"}, status: :not_found
    end
    

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
end
