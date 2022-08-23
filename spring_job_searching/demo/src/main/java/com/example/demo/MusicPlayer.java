package com.example.demo;

import java.util.ArrayList;
import java.util.List;

public class MusicPlayer {
    private Music music;
//    private List<Music> musicList = new ArrayList<>();

    private String name;
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    private int volume;
    public int getVolume() {
        return volume;
    }
    public void setVolume(int volume) {
        this.volume = volume;
    }




    // inversion of control (инверсия управления)
    public MusicPlayer(Music music) {
        this.music = music;
    }

    public MusicPlayer() {}

    public void setMusic(Music music) {
        this.music = music;
    }

    public void playMusic() {
        System.out.println("playing: " + music.getSong());
    }
}
