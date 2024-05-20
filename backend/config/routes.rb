Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  # resources :slots, only: [:index, :create, :take]
  resources :coaches, only: [:index, :show] do
    resources :slots, only: [:create, :index, :show] do
      collection do
        get 'available'
        get 'upcoming', to: 'slots#coach_upcoming'
        get 'past'
      end
      member do
        patch 'complete'
      end
    end
  end

  resources :slots, only: [:show] do
    member do
      patch 'take'
    end
  end

  resources :students, only: [:show] do
    resources :slots, only: [] do
      collection do
        get 'upcoming', to: 'slots#student_upcoming'
      end
    end
  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
