class ApplicationController < ActionController::API
  before_action :authorized_user
  include ActionController::Cookies
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_invalid

  # make current user actions
  def user
    user ||= User.find_by(id: session[:user_id])
  end


  # make authorized current user action
  def authorized_user
    render json: { error: "Not authorized" }, status: :unauthorized unless user
  end


  private

  def render_not_found(resp)
    render json: { error: "#{resp.model} not found" }, status: :not_found
  end

  def render_invalid(resp)
    render json: { errors: resp.record.errors.full_messages }, status: :unprocessable_entity
  end
end
