class TranslatorController < ApplicationController
  def index
  end

  def result
  	translated = ogp_params[:translated]
    image = OgpCreator.build(translated)
  end

  def ogp_params
    params.permit(:translated)
  end
end
