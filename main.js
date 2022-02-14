
       /**
        * 1. Render songs
        * 2. Scroll top
        * 3. Play / pause / seek
        * 4. CD rotate
        * 5. Next / prev
        * 6. Random
        * 7. Next / Repeat when ended
        * 8. Active song
        * 9. Scroll active song into view
        * 10. Play song when click
       */

       /**
        * 1. Chỉnh cho đĩa CD quay vô hạn -> OK (Viết nhầm từ iterations: Infinity 
        *                                        // Kiểu lặp: Vô hạn).
        * 2. Chỉnh thời gian hiển thị của bài hát -> OK
        * 3. Chỉnh cho thanh kéo bài hát tới đâu kéo tới đấy (như thanh của zing Mp3)
        * 4. Thêm class có hình trái tym vào giao diện,
        *    hiển thị khi thêm và gỡ bài hát vào thư viện yêu thích
        * 5. Hiển thị thanh lên xuống âm nhạc trong song đc active -> OK (spectrum)
        * 6. Thêm danh sách bài hát yêu thích
        * 7. Đổi background-image thành ảnh image đang phát -> OK
        */

        const $ = document.querySelector.bind(document);
        const $$ = document.querySelectorAll.bind(document);

        const PLAYER_STORAGE_KEY = 'MUSIC_PLAYER';
        const LIST_LOVE_STORAGE_KEY = 'MUSIC_LOVE';

        const player = $('.player');
        const dashboard = $('.dashboard');
        const cd = $('.cd');
        const heading = $('header h2');
        const cdThumb = $('.cd-thumb');
        const audio = $('#audio');
        const playBtn = $('.btn-toggle-play');
        const progress = $('#progress');
        const prevBtn = $('.btn-prev');
        const nextBtn = $('.btn-next');
        const randomBtn = $('.btn-random');
        const repeatBtn = $('.btn-repeat');
        const playlist = $('.playlist');
        const cdVolume = $('.cd-volume_icon');
        const volumeChange = $('#volume-change_input');
        const loveMusic = $('.love_music');
        const headerMenu = $('#header_menu');
        const musicNav = $('.music-nav');
        const musicPlayer = $('.music_player');
        const listSongs = $$('.music-nav_item');
        const vietnamese = $('.vietnamese');
        const us_uk = $('.us_uk');
        const china = $('.china');
        const loveList =$('.love_list');
        const addLoveListNotice = $('.love_music .fa-regular');
        const removeLoveListNotice = $('.love_music .fa-solid');
        
        const app = {
            currentIndex: 0,
            currentList: 'vietnamese',
            isPlaying: false,
            isRandom: false,
            isRepeat: false,
            isLove: false,
            isSelect: false,
            isVietnamese: true,
            isUsUk: false,
            isChina: false,
            isLovelist: false,
            // config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
            // configLove: JSON.parse(localStorage.getItem(LIST_LOVE_STORAGE_KEY)) || {},
            // setConfig: function(key,value) {
            //     this.config[key] = value;
            //     localStorage.setItem(PLAYER_STORAGE_KEY,JSON.stringify(this.config));
            // },
            // setConfigLove: function(arrayLove){
            //     this.configLove = arrayLove;
            //     localStorage.setItem(LIST_LOVE_STORAGE_KEY,JSON.stringify(this.configLove));
            // },
            songs: {
                vietnamese: [
                    {
                        name: 'Nụ hồng mong manh',
                        singer: 'Bích Phương',
                        path: './assets/music/song1.mp3',
                        image:'./assets/images/song1.jpg'
                    },
                    {
                        name: 'Chạy về khóc với anh',
                        singer: 'ERIK',
                        path: './assets/music/song2.mp3',
                        image:'./assets/images/song2.jpg'
                    },
                    {
                        name: 'Không phải em đúng không',
                        singer: 'Dương Hoàng Yến',
                        path: './assets/music/song3.mp3',
                        image:'./assets/images/song3.jpg'
                    },
                    {
                        name: 'Nhắn rằng anh nhớ em',
                        singer: 'Đình Dũng',
                        path: './assets/music/song4.mp3',
                        image:'./assets/images/song4.jpg'
                    },
                    {
                        name: 'Người lạ thoáng qua',
                        singer: 'Đinh Tùng Huy',
                        path: './assets/music/song5.mp3',
                        image:'./assets/images/song5.jpg'
                    },
                    {
                        name: 'Anh mệt rồi',
                        singer: 'Anh Quân Idol',
                        path: './assets/music/song6.mp3',
                        image:'./assets/images/song6.jpg'
                    },
                    {
                        name: 'Tình cũ bao giờ cũng tốt hơn',
                        singer: 'Dương Hoàng Yến',
                        path: './assets/music/song7.mp3',
                        image:'./assets/images/song7.jpg'
                    },
                    {
                        name: 'Anh khác hay em khác',
                        singer: 'Khắc Việt',
                        path: './assets/music/song8.mp3',
                        image:'./assets/images/song8.jpg'
                    },
                    {
                        name: 'Là ai từ bỏ, là ai vô tình',
                        singer: 'Hương Ly',
                        path: './assets/music/song9.mp3',
                        image:'./assets/images/song9.jpg'
                    },
                    {
                        name: 'Em say rồi',
                        singer: 'Thương Võ',
                        path: './assets/music/song10.mp3',
                        image:'./assets/images/song10.jpg'
                    },
                    {
                        name: 'Yêu lại từ đầu',
                        singer: 'Khắc Việt',
                        path: './assets/music/song11.mp3',
                        image:'./assets/images/song11.jpg'
                    },
                    {
                        name: 'Tình anh',
                        singer: 'Đình Dũng',
                        path: './assets/music/song12.mp3',
                        image:'./assets/images/song12.jpg'
                    },
                    {
                        name: 'Nếu là anh',
                        singer: 'The Man',
                        path: './assets/music/song13.mp3',
                        image:'./assets/images/song13.jpg'
                    },
                    {
                        name: 'Gió đánh đò đưa',
                        singer: 'Tạ Quang Thắng , Hồng Duyên',
                        path: './assets/music/song14.mp3',
                        image:'./assets/images/song14.jpg'
                    },
                    {
                        name: 'Biển tình',
                        singer: 'Quang Lê',
                        path: './assets/music/song15.mp3',
                        image:'./assets/images/song15.jpg'
                    },

                ],
                us_uk:[
                    {
                        name: ' Walk Thru Fire',
                        singer: 'Vicetone',
                        path: './assets/music/song1b.mp3',
                        image:'https://coub-anubis-a.akamaized.net/coub_storage/coub/simple/cw_timeline_pic/dde4260caeb/e4015995b945e02b31097/ios_large_1536170728_image.jpg'
                    },
                    {
                        name: 'The Nights ',
                        singer: 'Avicii',
                        path: './assets/music/song2b.mp3',
                        image:'./assets/images/song2b.jpg'
                    },
                    {
                        name: 'Monsters',
                        singer: 'Katie Sky',
                        path: './assets/music/song3b.mp3',
                        image:'https://i1.sndcdn.com/artworks-000637445251-79f3pp-t500x500.jpg'
                    },
                    {
                        name: ' Let Her Go',
                        singer: 'Passenger',
                        path: './assets/music/song4b.mp3',
                        image:'https://i1.sndcdn.com/artworks-000108709778-lpuc27-t500x500.jpg'
                    },
                    {
                        name: 'Why Not Me',
                        singer: 'Enrique Iglesias',
                        path: './assets/music/song5b.mp3',
                        image:'https://avatar-ex-swe.nixcdn.com/song/2018/09/20/2/c/a/3/1537413925557_640.jpg'
                    },

                    {
                        name: 'Beautiful In White',
                        singer: 'Shane Filan',
                        path: './assets/music/song6b.mp3',
                        image:'https://i.ytimg.com/vi/iV2t4a5Q1nE/maxresdefault.jpg'
                    },
                    
                ],
                china: [
                    {
                        name: 'Yêu Giang Sơn Càng Yêu Mỹ Nhân',
                        singer: 'Tiểu A Phong',
                        path: './assets/music/song1c.mp3',
                        image:'https://bigdata-vn.com/wp-content/uploads/2021/10/1634776292_357_Hinh-anh-gai-xinh-co-trang-dep-Ngam-mai-khong.jpg'
                    },
                    {
                        name: 'Thời không sai lệch',
                        singer: 'Ngải Thần',
                        path: './assets/music/song3c.mp3',
                        image:'https://dbk.vn/uploads/ckfinder/images/tranh-anh/anh-buon-1.jpg'
                    },
                    {
                        name: 'Người Đến Từ Triều Châu',
                        singer: 'Trác Y Đình',
                        path: './assets/music/song2c.mp3',
                        image:'http://data.voh.com.vn/voh/Image/2019/10/15/1_20191015054238.jpg'
                    },
                ],
                love :[],
            },
                
                
            defineProperties: function (){
                Object.defineProperty(this, 'currentSong',{
                    get: function () {
                        return this.songs[this.currentList][this.currentIndex];
                    }
                })
            },
            render: function (){
                const htmls = this.songs[this.currentList].map((song,index) => {
                    return ` 
                        <div class="song ${ index === this.currentIndex ? 'active' : ''}" data-index="${ index}">
                            <div class="thumb"
                                style="background-image: url(${song.image})">
                            </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="spectrum">
                                <div></div>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>`
                })
                playlist.innerHTML = htmls.join('');
            },

            handleEvents: function (){
                cdWidth = cd.offsetWidth;

                const _this = this;
                // Xử lý phóng to / thu nhỏ CD
                document.onscroll = function () {
                    const scrollTop = window.scrollY || document.documentElement.scrollTop;
                    const newCdWidth = cdWidth - scrollTop;
                    cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
                    cd.style.opacity = newCdWidth / cdWidth;
                }

                // Xử lý CD quay / dừng
                const cdThumbAnimate = cdThumb.animate([
                    {transform : 'rotate(360deg)'}
                ],
                {
                    duration: 18000, // 10 seconds (Thời gian lặp lại)
                    iterations: Infinity // Kiểu lặp: Vô hạn
                })

                cdThumbAnimate.pause();

                // Xử lý khi click vào play btn
                playBtn.onclick = function () {
                   if(_this.isPlaying) {
                       audio.pause();
                   }
                   else{
                       audio.play();
                   }
                }

                //Khi song được play
                audio.onplay = function () {
                    _this.isPlaying = true;
                    player.classList.add('playing');
                    $('.song.active .spectrum').classList.add('active');
                    $('.song.active .spectrum').classList.remove('pause');
                    cdThumbAnimate.play();
                }

                // Khi song bị pause
                audio.onpause = function () {
                    _this.isPlaying = false;
                    player.classList.remove('playing');
                    $('.song.active .spectrum').classList.remove('active');
                    $('.song.active .spectrum').classList.add('pause');
                    cdThumbAnimate.pause();
                }

                // Xử lý cho thanh tua khi nhạc chạy
                audio.ontimeupdate = function () {
                    if(audio.duration){
                        const progressPercent = audio.currentTime / audio.duration * 100;
                        progress.value = progressPercent;
                    }
                }

                // Khi song được tua
                progress.onchange = function (e) {
                    const seekTime = e.target.value * audio.duration / 100 ;
                    audio.currentTime = seekTime;
                }

                // Khi click next btn
                nextBtn.onclick = function () {
                    if(_this.isRandom){
                        _this.playRandomSong();
                    }
                    else{
                        _this.nextSong();
                    }
                    audio.play();
                    _this.render();
                    _this.loadBackgroundImgSong();
                    _this.scrollToActiveSong();
                }

                // Khi click prev btn
                prevBtn.onclick = function () {
                    if(_this.isRandom){
                        _this.playRandomSong();
                    }
                    else{
                        _this.prevSong();
                    }
                    audio.play();
                    _this.render();
                    _this.loadBackgroundImgSong();
                    _this.scrollToActiveSong();

                }

                // Xử lý bật / tắt click random btn
                randomBtn.onclick = function () {
                    _this.isRandom = !_this.isRandom;
                    // _this.setConfig('isRandom',_this.isRandom);
                    randomBtn.classList.toggle('active', _this.isRandom);
                }

                
                // Xử lý bật / tắt click repeat btn 
                repeatBtn.onclick = function () {
                    _this.isRepeat = !_this.isRepeat;
                    // _this.setConfig('isRepeat',_this.isRepeat);
                    repeatBtn.classList.toggle('active', _this.isRepeat);
                }

                // Xử lý next or repeat song sau khi audio ended
                audio.onended = function () {
                    if(_this.isRepeat){
                        audio.play();
                    }
                    else{
                        nextBtn.click();
                        _this.loadBackgroundImgSong();
                    }
                }

                // Xử lý khi click vào hình trái tym
                loveMusic.onclick = function () {
                    if(_this.isLove){
                        _this.isLove = false;
                        loveMusic.classList.remove('active');
                    }
                    else{
                        _this.isLove = true;
                        loveMusic.classList.add('active');
                    }
                }


                // song current time
                audio.addEventListener('timeupdate',function () {
                    var curtime = this.currentTime;
                    var min = Math.floor(curtime / 60);
                    var sec = Math.floor(curtime % 60);
                    $('.current-time').innerText = (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec);
                })

                // song duration timeupdate
                audio.onloadedmetadata = function () {
                    var durtime = this.duration;
                    var min = Math.floor(durtime / 60);
                    var sec = Math.floor(durtime % 60);
                    $('.duration-time').innerText = (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec);
                }

                // Xử lý bật , tắt volume
                cdVolume.addEventListener('click',function () {
                    if(audio.muted){
                        audio.muted = false;
                        cdVolume.classList.remove('active');
                        
                    }
                    else{
                        audio.muted = true;
                        cdVolume.classList.add('active');
                    }
                })
                // Xử lý âm lượng của volume
                volumeChange.oninput = function (e) {
                    audio.volume = e.target.value / 100;
                }

                //Play song when click
                playlist.onclick = function (e) {
                    const songNotActive = e.target.closest('.song:not(.active)');
                    // console.log(songNotActive);
                    if(songNotActive || e.target.closest('.song .option')){
                        if(songNotActive){
                            _this.currentIndex = Number(songNotActive.getAttribute('data-index'));
                            _this.loadCurrentSong();
                            _this.loadBackgroundImgSong();
                            _this.render();
                            audio.play();
                        }
                        if( e.target.closest('.song .option')) {

                        }
                    }
                    
                },

                // Handle change song list nav
                listSongs.forEach((listSong,index) => {
                    listSong.onclick = function () {
                        $('.music-nav_item.active').classList.remove('active');
                        _this.currentIndex = 0;
                        player.classList.remove('playing');
                        _this.isPlaying = false;
                        cdThumbAnimate.pause();
                        this.classList.add('active');
                        if(index == 0){
                            _this.currentList = 'vietnamese';
                            _this.loadCurrentSong();
                            _this.loadBackgroundImgSong();
                            _this.render();
                        }
                        else if(index == 1){
                            _this.currentList = 'us_uk';
                            _this.loadCurrentSong();
                            _this.loadBackgroundImgSong();
                            _this.render();
                        }
                        else if(index == 2){
                            _this.currentList = 'china';
                            _this.loadCurrentSong();
                            _this.loadBackgroundImgSong();
                            _this.render();
                        }
                        else{
                            _this.currentList = 'love';
                            _this.loadCurrentSong();
                            _this.loadBackgroundImgSong();
                            _this.render();
                        }
                    }
                })
                // Handle love list notice
                // addLoveListNotice.onclick = function () {
                //     console.log('thêm')
                //     newLove = _this.songs[_this.currentList][_this.currentIndex];
                //     _this.setConfigLove(newLove);
                //     _this.songs['love'].push(newLove);
                //     console.log(_this.songs['love'])
                // }
                // removeLoveListNotice.onclick = function () {
                //     console.log('xóa')
                //     newLove = _this.songs[_this.currentList][_this.currentIndex];
                //     _this.songs['love'].pop(newLove);
                //     _this.setConfigLove(newLove);
                // }
                // addLoveListNotice.onmouseover =  function () {
                //     $('.love_music-notice.add').textContent = 'Add love playlist';
                //     $('.love_music-notice.add').style.display = 'inline-block';
                // }
                // addLoveListNotice.onclick = function () {
                //     $('.love_music-notice.remove').style.display = 'none';
                //     $('.love_music-notice.add').style.display = 'none';
                // }
                // removeLoveListNotice.onmouseover = function () {
                //     $('.love_music-notice.remove').textContent = 'Remove love playlist';
                //     $('.love_music-notice.remove').style.display = 'inline-block';
                // }
                // removeLoveListNotice.onclick = function () {
                //     $('.love_music-notice.remove').style.display = 'none';
                //     $('.love_music-notice.add').style.display = 'none';
                // }
                // addLoveListNotice.onmouseover = function (){
                //     $('.love_music-notice.add').textContent = 'Add love playlist';
                // }
                // removeLoveListNotice.onmouseover = function (){
                //     $('.love_music-notice.remove').textContent = 'Remove love playlist';
                // }

            },

            scrollToActiveSong: function () {
                setTimeout(function () {
                    $('.song.active').scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    });
                },300)
            },

            loadCurrentSong: function (){
                heading.textContent = this.currentSong.name;
                cdThumb.style.backgroundImage = `url(${this.currentSong.image})` ;
                audio.src = this.currentSong.path;
            },

            loadBackgroundImgSong: function (){
                dashboard.style.backgroundImage = `url(${this.currentSong.image})`;
            },
            
            // loadConfig: function () {
            //     this.isRandom = this.config.isRandom;
            //     this.isRepeat = this.config.isRepeat;
            // },

            prevSong: function (){
                this.currentIndex -- ;
                if(this.currentIndex < 0){
                    this.currentIndex = this.songs.length - 1;
                }
                this.loadCurrentSong();
            },

            nextSong: function () {
                this.currentIndex ++;
                if(this.currentIndex == this.songs.length){
                    this.currentIndex = 0;
                }
                this.loadCurrentSong();
            },

            playRandomSong: function () {
                let newIndex;
                do{
                    newIndex = Math.floor(Math.random() * this.songs.length);
                }while (newIndex == this.currentIndex);
                this.currentIndex = newIndex;
                this.loadCurrentSong();
            },

           
            start: function (){
                // Gán cấu hình từ config vào ứng dụng
                // this.loadConfig();

                // Định nghĩa các thuộc tính cho object
                this.defineProperties();

                // Lắng nghe / Xử lý các sự kiện (DOM events)
                this.handleEvents();

                // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng.
                this.loadCurrentSong();
                
                // Render playlist
                this.render();

                // Hiển thị trạng thái ban đầu của button repeat & random
                randomBtn.classList.toggle('active', this.isRandom);
                repeatBtn.classList.toggle('active', this.isRepeat);
               
            }
        }

        app.start();
