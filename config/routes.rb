Rails.application.routes.draw do
  root 'static#home'

  devise_for :users

  resources :posts do
    resource :likes, only: %i[create destroy], module: :posts
  end

  resources :users, only: [:show], param: :username, path: '' do
    resources :posts, only: [:show], module: :users
  end

end
