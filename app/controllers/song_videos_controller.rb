class SongVideosController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    skip_before_action :authorized_user
    before_action :find_song_video, only: [:show, :destroy]

    wrap_parameters format: []

    def index
        render json: SongVideo.all, status: :ok
    end

    def show
        song_video = find_song_video
        render json: song_video
    end

    def create
        song_video = SongVideo.create!(song_video_params)
        render json: song_video, status: :created
    end


    def destroy
        song_video = find_song_video
        song_video.destroy
        head :no_content
    end

    private

    def find_song_video
        SongVideo.find(params[:id])
    end

    def song_video_params
        params.permit(:user_id, :song_id, :title, :video_url, :comments)
    end

    def render_not_found_response
        render json: { errors: "Song Video not found"}, status: :not_found
    end
    

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
end
