class SongVideoCommentsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    skip_before_action :authorized_user
    before_action :find_comment, only: [:show, :destroy]

    wrap_parameters format: []

    def index
        render json: SongVideoComment.all, status: :ok
    end

    def show
        comment = find_comment
        render json: comment
    end

    def create
        comment = SongVideoComment.create!(comment_params)
        render json: comment, status: :created
    end

    def update
        comment = find_comment
        comment.update!(comment_params)
        render json: comment, status: :ok
    end


    def destroy
        comment = find_comment
        comment.destroy
        head :no_content
    end

    private

    def find_comment
        SongVideoComment.find(params[:id])
    end

    def comment_params
        params.permit(:user_id, :body, :song_video_id)
    end

    def render_not_found_response
        render json: { errors: "Comment not found"}, status: :not_found
    end
    

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
end
