Rails.application.routes.draw do
  root 'static#home'

  devise_for :users
  resources :users, only: [:show], param: :username, path: ''

end
