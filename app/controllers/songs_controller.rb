class SongsController < ApplicationController
  def index
    render locals: {
      songs: Song.all
    }
  end

  def show
    render locals: {
      song: Song.find(params[:id])
    }
  end

  def new
    render locals: {
      song: Song.new
    }
  end

  def edit
    render locals: {
      song: Song.find(params[:id])
    }
  end

  def create
    song = Song.new(song_params)

    if song.save
      redirect_to song_path(song)
    else
      render :new, locals: {
        song: Song.new
      }
    end
  end

  def update
    song = Song.find(params[:id])

    if song.update(song_params)
      redirect_to song_path(song)
    else
      render :new, locals: {
        song: Song.new
      }
    end
  end

  def destroy
    Song.find(params[:id]).destroy
    redirect_to songs_path
  end

  private
  def song_params
    params[:song].permit :name, :author, :description, :midifile
  end
end
