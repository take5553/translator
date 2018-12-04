class TranslatorController < ApplicationController
  def index
  end

  def result
  	origin = ogp_params[:origin]
  	situation = ogp_params[:situation]
  	translated = ogp_params[:translated]
    image = OgpCreator.build(origin, situation, translated)
  end

  def ogp_params
    params.permit(:origin, :situation, :translated)
  end
end
