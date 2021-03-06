'use strict';

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

!function ($) {

    /**
     * Equalizer module.
     * @module foundation.equalizer
     */

    var Equalizer = function () {
        /**
         * Creates a new instance of Equalizer.
         * @class
         * @fires Equalizer#init
         * @param {Object} element - jQuery object to add the trigger to.
         * @param {Object} options - Overrides to the default plugin settings.
         */

        function Equalizer(element, options) {
            _classCallCheck(this, Equalizer);

            this.$element = element;
            this.options = $.extend({}, Equalizer.defaults, this.$element.data(), options);

            this._init();

            Foundation.registerPlugin(this, 'Equalizer');
        }

        /**
         * Initializes the Equalizer plugin and calls functions to get equalizer functioning on load.
         * @private
         */


        _createClass(Equalizer, [{
            key: '_init',
            value: function _init() {
                var eqId = this.$element.attr('data-equalizer') || '';
                var $watched = this.$element.find('[data-equalizer-watch="' + eqId + '"]');

                this.$watched = $watched.length ? $watched : this.$element.find('[data-equalizer-watch]');
                this.$element.attr('data-resize', eqId || Foundation.GetYoDigits(6, 'eq'));

                this.hasNested = this.$element.find('[data-equalizer]').length > 0;
                this.isNested = this.$element.parentsUntil(document.body, '[data-equalizer]').length > 0;
                this.isOn = false;

                var imgs = this.$element.find('img');
                var tooSmall;
                if (this.options.equalizeOn) {
                    tooSmall = this._checkMQ();
                    $(window).on('changed.zf.mediaquery', this._checkMQ.bind(this));
                } else {
                    this._events();
                }
                if (tooSmall !== undefined && tooSmall === false || tooSmall === undefined) {
                    if (imgs.length) {
                        Foundation.onImagesLoaded(imgs, this._reflow.bind(this));
                    } else {
                        this._reflow();
                    }
                }
            }

            /**
             * Removes event listeners if the breakpoint is too small.
             * @private
             */

        }, {
            key: '_pauseEvents',
            value: function _pauseEvents() {
                this.isOn = false;
                this.$element.off('.zf.equalizer resizeme.zf.trigger');
            }

            /**
             * Initializes events for Equalizer.
             * @private
             */

        }, {
            key: '_events',
            value: function _events() {
                var _this = this;
                this._pauseEvents();
                if (this.hasNested) {
                    this.$element.on('postequalized.zf.equalizer', function (e) {
                        if (e.target !== _this.$element[0]) {
                            _this._reflow();
                        }
                    });
                } else {
                    this.$element.on('resizeme.zf.trigger', this._reflow.bind(this));
                }
                this.isOn = true;
            }

            /**
             * Checks the current breakpoint to the minimum required size.
             * @private
             */

        }, {
            key: '_checkMQ',
            value: function _checkMQ() {
                var tooSmall = !Foundation.MediaQuery.atLeast(this.options.equalizeOn);
                if (tooSmall) {
                    if (this.isOn) {
                        this._pauseEvents();
                        this.$watched.css('height', 'auto');
                    }
                } else {
                    if (!this.isOn) {
                        this._events();
                    }
                }
                return tooSmall;
            }

            /**
             * A noop version for the plugin
             * @private
             */

        }, {
            key: '_killswitch',
            value: function _killswitch() {
                return;
            }

            /**
             * Calls necessary functions to update Equalizer upon DOM change
             * @private
             */

        }, {
            key: '_reflow',
            value: function _reflow() {
                if (!this.options.equalizeOnStack) {
                    if (this._isStacked()) {
                        this.$watched.css('height', 'auto');
                        return false;
                    }
                }
                if (this.options.equalizeByRow) {
                    this.getHeightsByRow(this.applyHeightByRow.bind(this));
                } else {
                    this.getHeights(this.applyHeight.bind(this));
                }
            }

            /**
             * Manually determines if the first 2 elements are *NOT* stacked.
             * @private
             */

        }, {
            key: '_isStacked',
            value: function _isStacked() {
                return this.$watched[0].offsetTop !== this.$watched[1].offsetTop;
            }

            /**
             * Finds the outer heights of children contained within an Equalizer parent and returns them in an array
             * @param {Function} cb - A non-optional callback to return the heights array to.
             * @returns {Array} heights - An array of heights of children within Equalizer container
             */

        }, {
            key: 'getHeights',
            value: function getHeights(cb) {
                var heights = [];
                for (var i = 0, len = this.$watched.length; i < len; i++) {
                    this.$watched[i].style.height = 'auto';
                    heights.push(this.$watched[i].offsetHeight);
                }
                cb(heights);
            }

            /**
             * Finds the outer heights of children contained within an Equalizer parent and returns them in an array
             * @param {Function} cb - A non-optional callback to return the heights array to.
             * @returns {Array} groups - An array of heights of children within Equalizer container grouped by row with element,height and max as last child
             */

        }, {
            key: 'getHeightsByRow',
            value: function getHeightsByRow(cb) {
                var lastElTopOffset = this.$watched.length ? this.$watched.first().offset().top : 0,
                    groups = [],
                    group = 0;
                //group by Row
                groups[group] = [];
                for (var i = 0, len = this.$watched.length; i < len; i++) {
                    this.$watched[i].style.height = 'auto';
                    //maybe could use this.$watched[i].offsetTop
                    var elOffsetTop = $(this.$watched[i]).offset().top;
                    if (elOffsetTop != lastElTopOffset) {
                        group++;
                        groups[group] = [];
                        lastElTopOffset = elOffsetTop;
                    }
                    groups[group].push([this.$watched[i], this.$watched[i].offsetHeight]);
                }

                for (var j = 0, ln = groups.length; j < ln; j++) {
                    var heights = $(groups[j]).map(function () {
                        return this[1];
                    }).get();
                    var max = Math.max.apply(null, heights);
                    groups[j].push(max);
                }
                cb(groups);
            }

            /**
             * Changes the CSS height property of each child in an Equalizer parent to match the tallest
             * @param {array} heights - An array of heights of children within Equalizer container
             * @fires Equalizer#preequalized
             * @fires Equalizer#postequalized
             */

        }, {
            key: 'applyHeight',
            value: function applyHeight(heights) {
                var max = Math.max.apply(null, heights);
                /**
                 * Fires before the heights are applied
                 * @event Equalizer#preequalized
                 */
                this.$element.trigger('preequalized.zf.equalizer');

                this.$watched.css('height', max);

                /**
                 * Fires when the heights have been applied
                 * @event Equalizer#postequalized
                 */
                this.$element.trigger('postequalized.zf.equalizer');
            }

            /**
             * Changes the CSS height property of each child in an Equalizer parent to match the tallest by row
             * @param {array} groups - An array of heights of children within Equalizer container grouped by row with element,height and max as last child
             * @fires Equalizer#preequalized
             * @fires Equalizer#preequalizedRow
             * @fires Equalizer#postequalizedRow
             * @fires Equalizer#postequalized
             */

        }, {
            key: 'applyHeightByRow',
            value: function applyHeightByRow(groups) {
                /**
                 * Fires before the heights are applied
                 */
                this.$element.trigger('preequalized.zf.equalizer');
                for (var i = 0, len = groups.length; i < len; i++) {
                    var groupsILength = groups[i].length,
                        max = groups[i][groupsILength - 1];
                    if (groupsILength <= 2) {
                        $(groups[i][0][0]).css({'height': 'auto'});
                        continue;
                    }
                    /**
                     * Fires before the heights per row are applied
                     * @event Equalizer#preequalizedRow
                     */
                    this.$element.trigger('preequalizedrow.zf.equalizer');
                    for (var j = 0, lenJ = groupsILength - 1; j < lenJ; j++) {
                        $(groups[i][j][0]).css({'height': max});
                    }
                    /**
                     * Fires when the heights per row have been applied
                     * @event Equalizer#postequalizedRow
                     */
                    this.$element.trigger('postequalizedrow.zf.equalizer');
                }
                /**
                 * Fires when the heights have been applied
                 */
                this.$element.trigger('postequalized.zf.equalizer');
            }

            /**
             * Destroys an instance of Equalizer.
             * @function
             */

        }, {
            key: 'destroy',
            value: function destroy() {
                this._pauseEvents();
                this.$watched.css('height', 'auto');

                Foundation.unregisterPlugin(this);
            }
        }]);

        return Equalizer;
    }();

    /**
     * Default settings for plugin
     */


    Equalizer.defaults = {
        /**
         * Enable height equalization when stacked on smaller screens.
         * @option
         * @example true
         */
        equalizeOnStack: true,
        /**
         * Enable height equalization row by row.
         * @option
         * @example false
         */
        equalizeByRow: false,
        /**
         * String representing the minimum breakpoint size the plugin should equalize heights on.
         * @option
         * @example 'medium'
         */
        equalizeOn: ''
    };

    // Window exports
    Foundation.plugin(Equalizer, 'Equalizer');
}(jQuery);