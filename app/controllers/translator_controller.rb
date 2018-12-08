class TranslatorController < ApplicationController
  def index
  end

  def result
  	translated = ogp_params[:translated]
  	# puts 'paramater is ...' + translated
    image = OgpCreator.build(translated)
    @originalText = ogp_params[:originalText]

  end

  def ogp_params
    params.permit(:translated, :originalText)
  end
end
