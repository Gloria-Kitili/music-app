Rails.application.routes.draw do
  resources :song_videos
  resources :user_songs
  resources :user_artists
  resources :user_albums
  resources :song_video_comments
  resources :songvideos
  resources :users
  resources :songs
  resources :albums
  resources :artists
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
