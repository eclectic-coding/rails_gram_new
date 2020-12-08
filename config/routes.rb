Rails.application.routes.draw do
  root 'static#home'

  devise_for :users

  resources :posts
  resources :users, only: [:show], param: :username, path: '' do
    resources :posts, only: [:show], module: :users
  end

end
