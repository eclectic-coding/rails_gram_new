Rails.application.routes.draw do
  root 'static#home'

  devise_for :users

  resources :followers, only: [:create, :destroy], param: :user_id

  resources :posts do
    resource :likes, only: [:create, :destroy], module: :posts
    resources :comments, only: [:show, :create, :new, :destroy], module: :posts
  end

  resources :users, only: [:show], param: :username, path: '' do
    resources :posts, only: [:show], module: :users
  end

end
