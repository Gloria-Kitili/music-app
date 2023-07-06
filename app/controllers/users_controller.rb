class UsersController < ApplicationController
    skip_before_action :authorized_user, only: [:show, :create, :index]

   wrap_parameters format: []
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def index
      render json: User.all, status: :ok
    end
    
    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def show
      user =  User.find(params[:id])       
       render json: user, status: :ok
      
    end

  
   
  
    private

    
    def user_params
      params.permit(:username, :password, :password_confirmation)
    end

    def render_not_found_response
      render json: { errors: " Welcome to SoundScape, music will be assigned to you shortly." }, status: :not_found
  end

       
    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
  
end
