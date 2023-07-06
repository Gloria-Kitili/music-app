class UserAlbumsController < ApplicationController
    before_action :find_user_album, only: [:show, :destroy]
    skip_before_action :authorized_user
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def index
        render json: UserAlbum.all, status: :ok
    end

    def show
        user_album = find_user_album
        render json: user_album
    end

    def create
        user_album = UserAlbum.create!(user_album_params)
        render json: user_album, status: :created
    end

    def destroy
        user_album = find_user_album
        user_album.destroy
        head :no_content
    end
    
    private

    def user_album_params
        params.permit(:user_id, :album_id)
    end

    def find_user_album
         UserAlbum.find(params[:id])
    end

    def render_not_found_response
        render json: { errors: "Albums for User not found"}, status: :not_found
    end
    

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
end
