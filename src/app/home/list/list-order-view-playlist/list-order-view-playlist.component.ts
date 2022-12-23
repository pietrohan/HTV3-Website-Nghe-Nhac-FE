import {Component, OnInit} from '@angular/core';
import {Playlist} from "../../../model/playlist";
import {PlaylistService} from "../../../service/playlist/playlist.service";

declare var Swiper: any;
declare var $: any;

@Component({
  selector: 'app-list-order-view-playlist',
  templateUrl: './list-order-view-playlist.component.html',
  styleUrls: ['./list-order-view-playlist.component.css']
})
export class ListOrderViewPlaylistComponent implements OnInit {
  playlists: Playlist[] = [];

  constructor(private playlistService: PlaylistService) {
  }

  ngOnInit(): void {

    this.playlistService.getAllPlaylistsDescView().subscribe(res => {
      this.playlists = res;
      $(() => {
        const swiper = new Swiper('.carousel-gallery .swiper-container', {
          effect: 'slide',
          speed: 900,
          slidesPerView: 5,
          spaceBetween: 20,
          simulateTouch: true,
          autoplay: {
            delay: 5000,
            stopOnLastSlide: false,
            disableOnInteraction: false
          },
          pagination: {
            el: '.carousel-gallery .swiper-pagination',
            clickable: true
          },
          breakpoints: {
            // when window width is <= 480px
            425: {
              slidesPerView: 2,
              spaceBetween: 10
            },
            // when window width is <= 640px
            768: {
              slidesPerView: 3,
              spaceBetween: 20
            },
            // when window width is <= 640px
            1024: {
              slidesPerView: 6,
              spaceBetween: 20
            },
            // when window width is <= 1680px
            2500: {
              slidesPerView: 5,
              spaceBetween: 22
            }
          }
        });

      });
    });

  }
}
