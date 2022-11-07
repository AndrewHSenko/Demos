class HomeController < ApplicationController
  def index
  end

  def about
    @about_me = "I am me"
    @answer = 2 + 2
  end
  
end
