Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  # resources :slots, only: [:index, :create, :take]
  resources :coaches, only: [] do
    resources :slots, only: [:create, :index] do
      member do
        post 'take'
      end
    end
  end

  # resources :students, only: [] do
  #   resources :slots, only: [:take]
  # end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
