import {Component, OnInit} from '@angular/core';
import {Song} from "../../model/song";
import {SongService} from "../../service/song/song.service";

declare var Swiper: any;
declare var $: any;

@Component({
  selector: 'app-list-order-view-song',
  templateUrl: './list-order-view-song.component.html',
  styleUrls: ['./list-order-view-song.component.css']
})
export class ListOrderViewSongComponent implements OnInit{

  songList: Song[] = [];

  constructor(private songService: SongService) {
  }

  ngOnInit(): void {
    // Sửa thành getSongByLike()
    this.songService.getAllSongsDescView().subscribe(res => {
      this.songList = res;
      $(() => {
        const swiper = new Swiper('.carousel-gallery .swiper-container', {
          effect: 'slide',
          speed: 900,
          slidesPerView: 5,
          spaceBetween: 20,
          simulateTouch: true,
          autoplay: {
            delay: 3000,
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
              slidesPerView: 5,
              spaceBetween: 20
            },
            // when window width is <= 1680px
            2500: {
              slidesPerView: 5,
              spaceBetween: 30
            }
          }
        });

      });
    });
  }


}
