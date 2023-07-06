class UserSongsController < ApplicationController
    before_action :find_user_song, only: [:show, :destroy]
    skip_before_action :authorized_user 
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def index
        render json: UserSong.all, status: :ok
    end

    def show
        user_song = find_user_song
        render json: user_song
    end

    def create
        user_song = UserSong.create!(user_song_params)
        render json: user_song, status: :created
    end

    def destroy
        user_song = find_user_song
        user_song.destroy
        head :no_content
    end
    
    private

    def user_song_params
        params.permit(:user_id, :song_id)
    end

    def find_user_song
         UserSong.find(params[:id])
    end

    def render_not_found_response
        render json: { errors: "Songs for User not found"}, status: :not_found
    end
    

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
end
