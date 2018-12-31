Rails.application.routes.draw do
  root 'translator#index'
  get '/result(/:originalText/:translated(/:situation))' => 'translator#result'
  get 'api_connector/connectApiGoogle'
  get 'api_connector/connectApiBing'
  get 'api_connector/connectApiWatson'
  get 'api_connector/connectApiYandex'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
