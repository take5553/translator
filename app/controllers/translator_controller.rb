class TranslatorController < ApplicationController
  def index
  end

  def result
  	text = ogp_params[:text]
    image = OgpCreator.build(text)
  end

  def ogp_params
    params.permit(:text)
  end
end
