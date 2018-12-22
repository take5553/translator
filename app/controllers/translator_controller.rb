class TranslatorController < ApplicationController

  def index
  end

  def result
  	translated = (ogp_params[:translated]).gsub("'", "\\\\'")
    image = OgpCreator.build(translated)
    @originalText = ogp_params[:originalText]
    @situation = ogp_params[:situation]

  end

  def ogp_params
    params.permit(:translated, :originalText, :situation)
  end
end
