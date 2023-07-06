Rails.application.routes.draw do
  resources :users
  resources :songs
  resources :albums
  resources :artists
  resources :user_songs
  resources :user_albums
  resources :user_artists
  resources :song_videos
  resources :song_video_comments

  
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/me', to: 'users#show'
  # root :to => 'artists#index'
  # root :to => 'albums#index'

 
 
 
  get '/hello', to: 'application#hello_world'

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
