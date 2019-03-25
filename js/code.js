
function Slider(move, btn_stl_right, btn_stl_left, btn_left, btn_right, 
                count_elem, dist, margin) {
    this.right = 1;
    this.left = 0;
    this.now_dist = 0;
    this.dist = this.get_dist(dist, margin)
    this.move_box = this.get_element(move);
    this.button_style_right = this.get_element(btn_stl_right);
    this.button_style_left = this.get_element(btn_stl_left);
    this.button_left = this.get_element(btn_left);
    this.button_right = this.get_element(btn_right);
    this.item_count = this.get_count_elements(count_elem);
    this.new_play_right = this.play_right.bind(this);
    this.new_play_left = this.play_left.bind(this);
    this.button_right.addEventListener('click', this.new_play_right);
    }
    
Slider.prototype.get_element = function(name) {
    return document.getElementById(name);
    }

Slider.prototype.get_count_elements = function(name) {
    return document.querySelectorAll(name).length - 1;
    }

Slider.prototype.get_dist = function(dist, margin) {
    return ~~ Number(window.getComputedStyle(document.getElementById(dist), null).getPropertyValue('width').slice(0, -2)) + margin;
    }

Slider.prototype.play_right = function() {
    if (this.left == 0) {this.add_color_event('left');}
    let to = (this.now_dist - this.dist) + 'px';
    this.move_box.style.transform = 'translate3d(' + to + ',0,0)';
    this.now_dist-=this.dist;
    if (Math.abs(this.now_dist) == (this.item_count * this.dist)) this.remove_color_event('right')
    }

Slider.prototype.play_left = function() {
    if (this.right == 0) this.add_color_event('right')
    let to = (this.now_dist + this.dist) + 'px';
    this['move_box'].style.transform = 'translate3d(' + to + ',0,0)';
    this.now_dist+=this.dist;
    if (Math.abs(this.now_dist) == 0) this.remove_color_event('left')
    }

Slider.prototype.add_color_event = function(name) {
    this[name] = 1;
    this['button_style_' + name].style.stroke = '#883eca';
    this['button_' + name].addEventListener('click', this['new_play_' + name]);
    }

Slider.prototype.remove_color_event = function(name) {
    this['button_' + name].removeEventListener('click', this['new_play_' + name]);
    this['button_style_' + name].style.stroke = 'lightgrey';
    this[name] = 0;
    }


var sld = new Slider('sld-move-box', 'btn-stl-right', 'btn-stl-left', 'slider-left', 'slider-right', 'div.box-images img', 'dist-sld', 5);
var fdb = new Slider('fdb-move-box', 'fdb-stl-right', 'fdb-stl-left', 'fdb-left', 'fdb-right', 'div.moving div.opinion', 'fdb-dist', 15)


