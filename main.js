
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
        
        const app = {
            currentIndex: 0,
            isPlaying: false,
            isRandom: false,
            isRepeat: false,
            isLove: false,
            isSelect: false,
            config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
            setConfig: function(key,value) {
                this.config[key] = value;
                localStorage.setItem(PLAYER_STORAGE_KEY,JSON.stringify(this.config));
            },
            songs: [
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
                    image:'/assets/images/song6.jpg'
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
                
            ],
            defineProperties: function (){
                Object.defineProperty(this, 'currentSong',{
                    get: function () {
                        return this.songs[this.currentIndex];
                    }
                })
            },
            render: function (){
                const htmls = this.songs.map((song,index) => {
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
                    _this.setConfig('isRandom',_this.isRandom);
                    randomBtn.classList.toggle('active', _this.isRandom);
                }

                
                // Xử lý bật / tắt click repeat btn 
                repeatBtn.onclick = function () {
                    _this.isRepeat = !_this.isRepeat;
                    _this.setConfig('isRepeat',_this.isRepeat);
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
                    
                }

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

            loadConfig: function () {
                this.isRandom = this.config.isRandom;
                this.isRepeat = this.config.isRepeat;
            },

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
                this.loadConfig();

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
        