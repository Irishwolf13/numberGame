Rails.application.routes.draw do
  resources :characters
  resources :users
  resources :hunters
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # Added per instructinos
  get '/hello', to: 'application#hello_world'
  
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
