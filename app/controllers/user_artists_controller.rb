class UserArtistsController < ApplicationController
    before_action :find_user_artist, only: [:show, :destroy]
    skip_before_action :authorized_user
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def index
        render json: UserArtist.all, status: :ok
    end

    def show
        user_artist = find_user_artist
        render json: user_artist
    end

    def create
        user_artist = UserArtist.create!(user_artist_params)
        render json: user_artist, status: :created
    end

    def destroy
        user_artist = find_user_artist
        user_artist.destroy
        head :no_content
    end
    
    private

    def user_artist_params
        params.permit(:user_id, :artist_id)
    end

    def find_user_artist
         UserArtist.find(params[:id])
    end

    def render_not_found_response
        render json: { errors: "Artists for user not found"}, status: :not_found
    end
    

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
end
