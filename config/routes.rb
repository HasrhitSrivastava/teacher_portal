Rails.application.routes.draw do
  devise_for :teachers
  resources :students, only: [:index, :new, :create, :edit, :update, :destroy]
  root to: 'students#index'
end
