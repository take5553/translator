require 'test_helper'

class TranslatorControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get translator_index_url
    assert_response :success
  end

end
