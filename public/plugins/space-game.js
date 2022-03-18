this.createjs = this.createjs || {}, createjs.extend = function (t, e) { "use strict"; function n() { this.constructor = t } return n.prototype = e.prototype, t.prototype = new n }, this.createjs = this.createjs || {}, createjs.promote = function (t, e) { "use strict"; var n = t.prototype, i = Object.getPrototypeOf && Object.getPrototypeOf(n) || n.__proto__; if (i) for (var r in n[(e += "_") + "constructor"] = i.constructor, i) n.hasOwnProperty(r) && "function" == typeof i[r] && (n[e + r] = i[r]); return t }, this.createjs = this.createjs || {}, createjs.deprecate = function (t, e) { "use strict"; return function () { var n = "Deprecated property or method '" + e + "'. See docs for info."; return console && (console.warn ? console.warn(n) : console.log(n)), t && t.apply(this, arguments) } }, this.createjs = this.createjs || {}, function () { "use strict"; function t(t, e, n) { this.type = t, this.target = null, this.currentTarget = null, this.eventPhase = 0, this.bubbles = !!e, this.cancelable = !!n, this.timeStamp = (new Date).getTime(), this.defaultPrevented = !1, this.propagationStopped = !1, this.immediatePropagationStopped = !1, this.removed = !1 } var e = t.prototype; e.preventDefault = function () { this.defaultPrevented = this.cancelable && !0 }, e.stopPropagation = function () { this.propagationStopped = !0 }, e.stopImmediatePropagation = function () { this.immediatePropagationStopped = this.propagationStopped = !0 }, e.remove = function () { this.removed = !0 }, e.clone = function () { return new t(this.type, this.bubbles, this.cancelable) }, e.set = function (t) { for (var e in t) this[e] = t[e]; return this }, e.toString = function () { return "[Event (type=" + this.type + ")]" }, createjs.Event = t }(), this.createjs = this.createjs || {}, function () { "use strict"; function t() { this._listeners = null, this._captureListeners = null } var e = t.prototype; t.initialize = function (t) { t.addEventListener = e.addEventListener, t.on = e.on, t.removeEventListener = t.off = e.removeEventListener, t.removeAllEventListeners = e.removeAllEventListeners, t.hasEventListener = e.hasEventListener, t.dispatchEvent = e.dispatchEvent, t._dispatchEvent = e._dispatchEvent, t.willTrigger = e.willTrigger }, e.addEventListener = function (t, e, n) { var i, r = (i = n ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {})[t]; return r && this.removeEventListener(t, e, n), (r = i[t]) ? r.push(e) : i[t] = [e], e }, e.on = function (t, e, n, i, r, s) { return e.handleEvent && (n = n || e, e = e.handleEvent), n = n || this, this.addEventListener(t, function (t) { e.call(n, t, r), i && t.remove() }, s) }, e.removeEventListener = function (t, e, n) { var i = n ? this._captureListeners : this._listeners; if (i) { var r = i[t]; if (r) for (var s = 0, a = r.length; s < a; s++)if (r[s] == e) { 1 == a ? delete i[t] : r.splice(s, 1); break } } }, e.off = e.removeEventListener, e.removeAllEventListeners = function (t) { t ? (this._listeners && delete this._listeners[t], this._captureListeners && delete this._captureListeners[t]) : this._listeners = this._captureListeners = null }, e.dispatchEvent = function (t, e, n) { if ("string" == typeof t) { var i = this._listeners; if (!(e || i && i[t])) return !0; t = new createjs.Event(t, e, n) } else t.target && t.clone && (t = t.clone()); try { t.target = this } catch (t) { } if (t.bubbles && this.parent) { for (var r = this, s = [r]; r.parent;)s.push(r = r.parent); var a, o = s.length; for (a = o - 1; a >= 0 && !t.propagationStopped; a--)s[a]._dispatchEvent(t, 1 + (0 == a)); for (a = 1; a < o && !t.propagationStopped; a++)s[a]._dispatchEvent(t, 3) } else this._dispatchEvent(t, 2); return !t.defaultPrevented }, e.hasEventListener = function (t) { var e = this._listeners, n = this._captureListeners; return !!(e && e[t] || n && n[t]) }, e.willTrigger = function (t) { for (var e = this; e;) { if (e.hasEventListener(t)) return !0; e = e.parent } return !1 }, e.toString = function () { return "[EventDispatcher]" }, e._dispatchEvent = function (t, e) { var n, i, r = e <= 2 ? this._captureListeners : this._listeners; if (t && r && (i = r[t.type]) && (n = i.length)) { try { t.currentTarget = this } catch (t) { } try { t.eventPhase = 0 | e } catch (t) { } t.removed = !1, i = i.slice(); for (var s = 0; s < n && !t.immediatePropagationStopped; s++) { var a = i[s]; a.handleEvent ? a.handleEvent(t) : a(t), t.removed && (this.off(t.type, a, 1 == e), t.removed = !1) } } 2 === e && this._dispatchEvent(t, 2.1) }, createjs.EventDispatcher = t }(), this.createjs = this.createjs || {}, function () { "use strict"; function t() { throw "Ticker cannot be instantiated." } t.RAF_SYNCHED = "synched", t.RAF = "raf", t.TIMEOUT = "timeout", t.timingMode = null, t.maxDelta = 0, t.paused = !1, t.removeEventListener = null, t.removeAllEventListeners = null, t.dispatchEvent = null, t.hasEventListener = null, t._listeners = null, createjs.EventDispatcher.initialize(t), t._addEventListener = t.addEventListener, t.addEventListener = function () { return !t._inited && t.init(), t._addEventListener.apply(t, arguments) }, t._inited = !1, t._startTime = 0, t._pausedTime = 0, t._ticks = 0, t._pausedTicks = 0, t._interval = 50, t._lastTime = 0, t._times = null, t._tickTimes = null, t._timerId = null, t._raf = !0, t._setInterval = function (e) { t._interval = e, t._inited && t._setupTick() }, t.setInterval = createjs.deprecate(t._setInterval, "Ticker.setInterval"), t._getInterval = function () { return t._interval }, t.getInterval = createjs.deprecate(t._getInterval, "Ticker.getInterval"), t._setFPS = function (e) { t._setInterval(1e3 / e) }, t.setFPS = createjs.deprecate(t._setFPS, "Ticker.setFPS"), t._getFPS = function () { return 1e3 / t._interval }, t.getFPS = createjs.deprecate(t._getFPS, "Ticker.getFPS"); try { Object.defineProperties(t, { interval: { get: t._getInterval, set: t._setInterval }, framerate: { get: t._getFPS, set: t._setFPS } }) } catch (t) { console.log(t) } t.init = function () { t._inited || (t._inited = !0, t._times = [], t._tickTimes = [], t._startTime = t._getTime(), t._times.push(t._lastTime = 0), t.interval = t._interval) }, t.reset = function () { if (t._raf) { var e = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame; e && e(t._timerId) } else clearTimeout(t._timerId); t.removeAllEventListeners("tick"), t._timerId = t._times = t._tickTimes = null, t._startTime = t._lastTime = t._ticks = t._pausedTime = 0, t._inited = !1 }, t.getMeasuredTickTime = function (e) { var n = 0, i = t._tickTimes; if (!i || i.length < 1) return -1; e = Math.min(i.length, e || 0 | t._getFPS()); for (var r = 0; r < e; r++)n += i[r]; return n / e }, t.getMeasuredFPS = function (e) { var n = t._times; return !n || n.length < 2 ? -1 : (e = Math.min(n.length - 1, e || 0 | t._getFPS()), 1e3 / ((n[0] - n[e]) / e)) }, t.getTime = function (e) { return t._startTime ? t._getTime() - (e ? t._pausedTime : 0) : -1 }, t.getEventTime = function (e) { return t._startTime ? (t._lastTime || t._startTime) - (e ? t._pausedTime : 0) : -1 }, t.getTicks = function (e) { return t._ticks - (e ? t._pausedTicks : 0) }, t._handleSynch = function () { t._timerId = null, t._setupTick(), t._getTime() - t._lastTime >= .97 * (t._interval - 1) && t._tick() }, t._handleRAF = function () { t._timerId = null, t._setupTick(), t._tick() }, t._handleTimeout = function () { t._timerId = null, t._setupTick(), t._tick() }, t._setupTick = function () { if (null == t._timerId) { var e = t.timingMode; if (e == t.RAF_SYNCHED || e == t.RAF) { var n = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame; if (n) return t._timerId = n(e == t.RAF ? t._handleRAF : t._handleSynch), void (t._raf = !0) } t._raf = !1, t._timerId = setTimeout(t._handleTimeout, t._interval) } }, t._tick = function () { var e = t.paused, n = t._getTime(), i = n - t._lastTime; if (t._lastTime = n, t._ticks++, e && (t._pausedTicks++, t._pausedTime += i), t.hasEventListener("tick")) { var r = new createjs.Event("tick"), s = t.maxDelta; r.delta = s && i > s ? s : i, r.paused = e, r.time = n, r.runTime = n - t._pausedTime, t.dispatchEvent(r) } for (t._tickTimes.unshift(t._getTime() - n); t._tickTimes.length > 100;)t._tickTimes.pop(); for (t._times.unshift(n); t._times.length > 100;)t._times.pop() }; var e = window, n = e.performance.now || e.performance.mozNow || e.performance.msNow || e.performance.oNow || e.performance.webkitNow; t._getTime = function () { return (n && n.call(e.performance) || (new Date).getTime()) - t._startTime }, createjs.Ticker = t }(), this.createjs = this.createjs || {}, function () { "use strict"; function t(t) { this.EventDispatcher_constructor(), this.ignoreGlobalPause = !1, this.loop = 0, this.useTicks = !1, this.reversed = !1, this.bounce = !1, this.timeScale = 1, this.duration = 0, this.position = 0, this.rawPosition = -1, this._paused = !0, this._next = null, this._prev = null, this._parent = null, this._labels = null, this._labelList = null, t && (this.useTicks = !!t.useTicks, this.ignoreGlobalPause = !!t.ignoreGlobalPause, this.loop = !0 === t.loop ? -1 : t.loop || 0, this.reversed = !!t.reversed, this.bounce = !!t.bounce, this.timeScale = t.timeScale || 1, t.onChange && this.addEventListener("change", t.onChange), t.onComplete && this.addEventListener("complete", t.onComplete)) } var e = createjs.extend(t, createjs.EventDispatcher); e._setPaused = function (t) { return createjs.Tween._register(this, t), this }, e.setPaused = createjs.deprecate(e._setPaused, "AbstractTween.setPaused"), e._getPaused = function () { return this._paused }, e.getPaused = createjs.deprecate(e._getPaused, "AbstactTween.getPaused"), e._getCurrentLabel = function (t) { var e = this.getLabels(); null == t && (t = this.position); for (var n = 0, i = e.length; n < i && !(t < e[n].position); n++); return 0 === n ? null : e[n - 1].label }, e.getCurrentLabel = createjs.deprecate(e._getCurrentLabel, "AbstractTween.getCurrentLabel"); try { Object.defineProperties(e, { paused: { set: e._setPaused, get: e._getPaused }, currentLabel: { get: e._getCurrentLabel } }) } catch (t) { } e.advance = function (t, e) { this.setPosition(this.rawPosition + t * this.timeScale, e) }, e.setPosition = function (t, e, n, i) { var r = this.duration, s = this.loop, a = this.rawPosition, o = 0, u = 0, c = !1; if (t < 0 && (t = 0), 0 === r) { if (c = !0, -1 !== a) return c } else { if (u = t - (o = t / r | 0) * r, (c = -1 !== s && t >= s * r + r) && (t = (u = r) * (o = s) + r), t === a) return c; !this.reversed != !(this.bounce && o % 2) && (u = r - u) } this.position = u, this.rawPosition = t, this._updatePosition(n, c), c && (this.paused = !0), i && i(this), e || this._runActions(a, t, n, !n && -1 === a), this.dispatchEvent("change"), c && this.dispatchEvent("complete") }, e.calculatePosition = function (t) { var e = this.duration, n = this.loop, i = 0, r = 0; return 0 === e ? 0 : (-1 !== n && t >= n * e + e ? (r = e, i = n) : r = t < 0 ? 0 : t - (i = t / e | 0) * e, !this.reversed != !(this.bounce && i % 2) ? e - r : r) }, e.getLabels = function () { var t = this._labelList; if (!t) { t = this._labelList = []; var e = this._labels; for (var n in e) t.push({ label: n, position: e[n] }); t.sort(function (t, e) { return t.position - e.position }) } return t }, e.setLabels = function (t) { this._labels = t, this._labelList = null }, e.addLabel = function (t, e) { this._labels || (this._labels = {}), this._labels[t] = e; var n = this._labelList; if (n) { for (var i = 0, r = n.length; i < r && !(e < n[i].position); i++); n.splice(i, 0, { label: t, position: e }) } }, e.gotoAndPlay = function (t) { this.paused = !1, this._goto(t) }, e.gotoAndStop = function (t) { this.paused = !0, this._goto(t) }, e.resolve = function (t) { var e = Number(t); return isNaN(e) && (e = this._labels && this._labels[t]), e }, e.toString = function () { return "[AbstractTween]" }, e.clone = function () { throw "AbstractTween can not be cloned." }, e._init = function (t) { t && t.paused || (this.paused = !1), t && null != t.position && this.setPosition(t.position) }, e._updatePosition = function (t, e) { }, e._goto = function (t) { var e = this.resolve(t); null != e && this.setPosition(e, !1, !0) }, e._runActions = function (t, e, n, i) { if (this._actionHead || this.tweens) { var r, s, a, o, u = this.duration, c = this.reversed, l = this.bounce, h = this.loop; if (0 === u ? (r = s = a = o = 0, c = l = !1) : (a = t - (r = t / u | 0) * u, o = e - (s = e / u | 0) * u), -1 !== h && (s > h && (o = u, s = h), r > h && (a = u, r = h)), n) return this._runActionsRange(o, o, n, i); if (r !== s || a !== o || n || i) { -1 === r && (r = a = 0); var p = t <= e, d = r; do { var f = d === r ? a : p ? 0 : u, _ = d === s ? o : p ? u : 0; if (!c != !(l && d % 2) && (f = u - f, _ = u - _), l && d !== r && f === _); else if (this._runActionsRange(f, _, n, i || d !== r && !l)) return !0; i = !1 } while (p && ++d <= s || !p && --d >= s) } } }, e._runActionsRange = function (t, e, n, i) { }, createjs.AbstractTween = createjs.promote(t, "EventDispatcher") }(), this.createjs = this.createjs || {}, function () { "use strict"; function t(e, i) { this.AbstractTween_constructor(i), this.pluginData = null, this.target = e, this.passive = !1, this._stepHead = new n(null, 0, 0, {}, null, !0), this._stepTail = this._stepHead, this._stepPosition = 0, this._actionHead = null, this._actionTail = null, this._plugins = null, this._pluginIds = null, this._injected = null, i && (this.pluginData = i.pluginData, i.override && t.removeTweens(e)), this.pluginData || (this.pluginData = {}), this._init(i) } var e = createjs.extend(t, createjs.AbstractTween); function n(t, e, n, i, r, s) { this.next = null, this.prev = t, this.t = e, this.d = n, this.props = i, this.ease = r, this.passive = s, this.index = t ? t.index + 1 : 0 } t.IGNORE = {}, t._tweens = [], t._plugins = null, t._tweenHead = null, t._tweenTail = null, t.get = function (e, n) { return new t(e, n) }, t.tick = function (e, n) { for (var i = t._tweenHead; i;) { var r = i._next; n && !i.ignoreGlobalPause || i._paused || i.advance(i.useTicks ? 1 : e), i = r } }, t.handleEvent = function (t) { "tick" === t.type && this.tick(t.delta, t.paused) }, t.removeTweens = function (e) { if (e.tweenjs_count) { for (var n = t._tweenHead; n;) { var i = n._next; n.target === e && t._register(n, !0), n = i } e.tweenjs_count = 0 } }, t.removeAllTweens = function () { for (var e = t._tweenHead; e;) { var n = e._next; e._paused = !0, e.target && (e.target.tweenjs_count = 0), e._next = e._prev = null, e = n } t._tweenHead = t._tweenTail = null }, t.hasActiveTweens = function (e) { return e ? !!e.tweenjs_count : !!t._tweenHead }, t._installPlugin = function (e) { for (var n = e.priority = e.priority || 0, i = t._plugins = t._plugins || [], r = 0, s = i.length; r < s && !(n < i[r].priority); r++); i.splice(r, 0, e) }, t._register = function (e, n) { var i = e.target; if (!n && e._paused) { i && (i.tweenjs_count = i.tweenjs_count ? i.tweenjs_count + 1 : 1); var r = t._tweenTail; r ? (t._tweenTail = r._next = e, e._prev = r) : t._tweenHead = t._tweenTail = e, !t._inited && createjs.Ticker && (createjs.Ticker.addEventListener("tick", t), t._inited = !0) } else if (n && !e._paused) { i && i.tweenjs_count--; var s = e._next, a = e._prev; s ? s._prev = a : t._tweenTail = a, a ? a._next = s : t._tweenHead = s, e._next = e._prev = null } e._paused = n }, e.wait = function (t, e) { return t > 0 && this._addStep(+t, this._stepTail.props, null, e), this }, e.to = function (t, e, n) { (null == e || e < 0) && (e = 0); var i = this._addStep(+e, null, n); return this._appendProps(t, i), this }, e.label = function (t) { return this.addLabel(t, this.duration), this }, e.call = function (t, e, n) { return this._addAction(n || this.target, t, e || [this]) }, e.set = function (t, e) { return this._addAction(e || this.target, this._set, [t]) }, e.play = function (t) { return this._addAction(t || this, this._set, [{ paused: !1 }]) }, e.pause = function (t) { return this._addAction(t || this, this._set, [{ paused: !0 }]) }, e.w = e.wait, e.t = e.to, e.c = e.call, e.s = e.set, e.toString = function () { return "[Tween]" }, e.clone = function () { throw "Tween can not be cloned." }, e._addPlugin = function (t) { var e = this._pluginIds || (this._pluginIds = {}), n = t.ID; if (n && !e[n]) { e[n] = !0; for (var i = this._plugins || (this._plugins = []), r = t.priority || 0, s = 0, a = i.length; s < a; s++)if (r < i[s].priority) return void i.splice(s, 0, t); i.push(t) } }, e._updatePosition = function (t, e) { var n = this._stepHead.next, i = this.position, r = this.duration; if (this.target && n) { for (var s = n.next; s && s.t <= i;)s = (n = n.next).next; var a = e ? 0 === r ? 1 : i / r : (i - n.t) / n.d; this._updateTargetProps(n, a, e) } this._stepPosition = n ? i - n.t : 0 }, e._updateTargetProps = function (e, n, i) { if (!(this.passive = !!e.passive)) { var r, s, a, o, u = e.prev.props, c = e.props; (o = e.ease) && (n = o(n, 0, 1, 1)); var l = this._plugins; t: for (var h in u) { if (r = (s = u[h]) !== (a = c[h]) && "number" == typeof s ? s + (a - s) * n : n >= 1 ? a : s, l) for (var p = 0, d = l.length; p < d; p++) { var f = l[p].change(this, e, h, r, n, i); if (f === t.IGNORE) continue t; void 0 !== f && (r = f) } this.target[h] = r } } }, e._runActionsRange = function (t, e, n, i) { var r = t > e, s = r ? this._actionTail : this._actionHead, a = e, o = t; r && (a = t, o = e); for (var u = this.position; s;) { var c = s.t; if ((c === e || c > o && c < a || i && c === t) && (s.funct.apply(s.scope, s.params), u !== this.position)) return !0; s = r ? s.prev : s.next } }, e._appendProps = function (e, n, i) { var r, s, a, o, u, c = this._stepHead.props, l = this.target, h = t._plugins, p = n.prev, d = p.props, f = n.props || (n.props = this._cloneProps(d)), _ = {}; for (r in e) if (e.hasOwnProperty(r) && (_[r] = f[r] = e[r], void 0 === c[r])) { if (o = void 0, h) for (s = h.length - 1; s >= 0; s--)if (void 0 !== (a = h[s].init(this, r, o)) && (o = a), o === t.IGNORE) { delete f[r], delete _[r]; break } o !== t.IGNORE && (void 0 === o && (o = l[r]), d[r] = void 0 === o ? null : o) } for (r in _) { a = e[r]; for (var v, g = p; (v = g) && (g = v.prev);)if (g.props !== v.props) { if (void 0 !== g.props[r]) break; g.props[r] = d[r] } } if (!1 !== i && (h = this._plugins)) for (s = h.length - 1; s >= 0; s--)h[s].step(this, n, _); (u = this._injected) && (this._injected = null, this._appendProps(u, n, !1)) }, e._injectProp = function (t, e) { (this._injected || (this._injected = {}))[t] = e }, e._addStep = function (t, e, i, r) { var s = new n(this._stepTail, this.duration, t, e, i, r || !1); return this.duration += t, this._stepTail = this._stepTail.next = s }, e._addAction = function (t, e, n) { var i = new function (t, e, n, i, r) { this.next = null, this.prev = t, this.t = e, this.d = 0, this.scope = n, this.funct = i, this.params = r }(this._actionTail, this.duration, t, e, n); return this._actionTail ? this._actionTail.next = i : this._actionHead = i, this._actionTail = i, this }, e._set = function (t) { for (var e in t) this[e] = t[e] }, e._cloneProps = function (t) { var e = {}; for (var n in t) e[n] = t[n]; return e }, createjs.Tween = createjs.promote(t, "AbstractTween") }(), this.createjs = this.createjs || {}, function () { "use strict"; function t(t) { var e, n; t instanceof Array || null == t && arguments.length > 1 ? (e = t, n = arguments[1], t = arguments[2]) : t && (e = t.tweens, n = t.labels), this.AbstractTween_constructor(t), this.tweens = [], e && this.addTween.apply(this, e), this.setLabels(n), this._init(t) } var e = createjs.extend(t, createjs.AbstractTween); e.addTween = function (t) { t._parent && t._parent.removeTween(t); var e = arguments.length; if (e > 1) { for (var n = 0; n < e; n++)this.addTween(arguments[n]); return arguments[e - 1] } if (0 === e) return null; this.tweens.push(t), t._parent = this, t.paused = !0; var i = t.duration; return t.loop > 0 && (i *= t.loop + 1), i > this.duration && (this.duration = i), this.rawPosition >= 0 && t.setPosition(this.rawPosition), t }, e.removeTween = function (t) { var e = arguments.length; if (e > 1) { for (var n = !0, i = 0; i < e; i++)n = n && this.removeTween(arguments[i]); return n } if (0 === e) return !0; var r = this.tweens; for (i = r.length; i--;)if (r[i] === t) return r.splice(i, 1), t._parent = null, t.duration >= this.duration && this.updateDuration(), !0; return !1 }, e.updateDuration = function () { this.duration = 0; for (var t = 0, e = this.tweens.length; t < e; t++) { var n = this.tweens[t], i = n.duration; n.loop > 0 && (i *= n.loop + 1), i > this.duration && (this.duration = i) } }, e.toString = function () { return "[Timeline]" }, e.clone = function () { throw "Timeline can not be cloned." }, e._updatePosition = function (t, e) { for (var n = this.position, i = 0, r = this.tweens.length; i < r; i++)this.tweens[i].setPosition(n, !0, t) }, e._runActionsRange = function (t, e, n, i) { for (var r = this.position, s = 0, a = this.tweens.length; s < a; s++)if (this.tweens[s]._runActions(t, e, n, i), r !== this.position) return !0 }, createjs.Timeline = createjs.promote(t, "AbstractTween") }(), this.createjs = this.createjs || {}, function () { "use strict"; function t() { throw "Ease cannot be instantiated." } t.linear = function (t) { return t }, t.none = t.linear, t.get = function (t) { return t < -1 ? t = -1 : t > 1 && (t = 1), function (e) { return 0 == t ? e : t < 0 ? e * (e * -t + 1 + t) : e * ((2 - e) * t + (1 - t)) } }, t.getPowIn = function (t) { return function (e) { return Math.pow(e, t) } }, t.getPowOut = function (t) { return function (e) { return 1 - Math.pow(1 - e, t) } }, t.getPowInOut = function (t) { return function (e) { return (e *= 2) < 1 ? .5 * Math.pow(e, t) : 1 - .5 * Math.abs(Math.pow(2 - e, t)) } }, t.quadIn = t.getPowIn(2), t.quadOut = t.getPowOut(2), t.quadInOut = t.getPowInOut(2), t.cubicIn = t.getPowIn(3), t.cubicOut = t.getPowOut(3), t.cubicInOut = t.getPowInOut(3), t.quartIn = t.getPowIn(4), t.quartOut = t.getPowOut(4), t.quartInOut = t.getPowInOut(4), t.quintIn = t.getPowIn(5), t.quintOut = t.getPowOut(5), t.quintInOut = t.getPowInOut(5), t.sineIn = function (t) { return 1 - Math.cos(t * Math.PI / 2) }, t.sineOut = function (t) { return Math.sin(t * Math.PI / 2) }, t.sineInOut = function (t) { return -.5 * (Math.cos(Math.PI * t) - 1) }, t.getBackIn = function (t) { return function (e) { return e * e * ((t + 1) * e - t) } }, t.backIn = t.getBackIn(1.7), t.getBackOut = function (t) { return function (e) { return --e * e * ((t + 1) * e + t) + 1 } }, t.backOut = t.getBackOut(1.7), t.getBackInOut = function (t) { return t *= 1.525, function (e) { return (e *= 2) < 1 ? e * e * ((t + 1) * e - t) * .5 : .5 * ((e -= 2) * e * ((t + 1) * e + t) + 2) } }, t.backInOut = t.getBackInOut(1.7), t.circIn = function (t) { return -(Math.sqrt(1 - t * t) - 1) }, t.circOut = function (t) { return Math.sqrt(1 - --t * t) }, t.circInOut = function (t) { return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1) }, t.bounceIn = function (e) { return 1 - t.bounceOut(1 - e) }, t.bounceOut = function (t) { return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375 }, t.bounceInOut = function (e) { return e < .5 ? .5 * t.bounceIn(2 * e) : .5 * t.bounceOut(2 * e - 1) + .5 }, t.getElasticIn = function (t, e) { var n = 2 * Math.PI; return function (i) { if (0 == i || 1 == i) return i; var r = e / n * Math.asin(1 / t); return -t * Math.pow(2, 10 * (i -= 1)) * Math.sin((i - r) * n / e) } }, t.elasticIn = t.getElasticIn(1, .3), t.getElasticOut = function (t, e) { var n = 2 * Math.PI; return function (i) { if (0 == i || 1 == i) return i; var r = e / n * Math.asin(1 / t); return t * Math.pow(2, -10 * i) * Math.sin((i - r) * n / e) + 1 } }, t.elasticOut = t.getElasticOut(1, .3), t.getElasticInOut = function (t, e) { var n = 2 * Math.PI; return function (i) { var r = e / n * Math.asin(1 / t); return (i *= 2) < 1 ? t * Math.pow(2, 10 * (i -= 1)) * Math.sin((i - r) * n / e) * -.5 : t * Math.pow(2, -10 * (i -= 1)) * Math.sin((i - r) * n / e) * .5 + 1 } }, t.elasticInOut = t.getElasticInOut(1, .3 * 1.5), createjs.Ease = t }(), this.createjs = this.createjs || {}, function () { "use strict"; function t() { throw "MotionGuidePlugin cannot be instantiated." } var e = t; e.priority = 0, e.ID = "MotionGuide", e.install = function () { return createjs.Tween._installPlugin(t), createjs.Tween.IGNORE }, e.init = function (t, n, i) { "guide" == n && t._addPlugin(e) }, e.step = function (t, n, i) { for (var r in i) if ("guide" === r) { var s = n.props.guide, a = e._solveGuideData(i.guide, s); s.valid = !a; var o = s.endData; if (t._injectProp("x", o.x), t._injectProp("y", o.y), a || !s.orient) break; var u = void 0 === n.prev.props.rotation ? t.target.rotation || 0 : n.prev.props.rotation; if (s.startOffsetRot = u - s.startData.rotation, "fixed" == s.orient) s.endAbsRot = o.rotation + s.startOffsetRot, s.deltaRotation = 0; else { var c = void 0 === i.rotation ? t.target.rotation || 0 : i.rotation, l = c - s.endData.rotation - s.startOffsetRot, h = l % 360; switch (s.endAbsRot = c, s.orient) { case "auto": s.deltaRotation = l; break; case "cw": s.deltaRotation = (h + 360) % 360 + 360 * Math.abs(l / 360 | 0); break; case "ccw": s.deltaRotation = (h - 360) % 360 + -360 * Math.abs(l / 360 | 0) } } t._injectProp("rotation", s.endAbsRot) } }, e.change = function (t, n, i, r, s, a) { var o = n.props.guide; if (o && n.props !== n.prev.props && o !== n.prev.props.guide) return "guide" === i && !o.valid || "x" == i || "y" == i || "rotation" === i && o.orient ? createjs.Tween.IGNORE : void e._ratioToPositionData(s, o, t.target) }, e.debug = function (t, n, i) { t = t.guide || t; var r = e._findPathProblems(t); if (r && console.error("MotionGuidePlugin Error found: \n" + r), !n) return r; var s = t.path, a = s.length; for (n.save(), n.lineCap = "round", n.lineJoin = "miter", n.beginPath(), n.moveTo(s[0], s[1]), l = 2; l < a; l += 4)n.quadraticCurveTo(s[l], s[l + 1], s[l + 2], s[l + 3]); n.strokeStyle = "black", n.lineWidth = 4.5, n.stroke(), n.strokeStyle = "white", n.lineWidth = 3, n.stroke(), n.closePath(); var o = i.length; if (i && o) { var u = {}, c = {}; e._solveGuideData(t, u); for (var l = 0; l < o; l++)u.orient = "fixed", e._ratioToPositionData(i[l], u, c), n.beginPath(), n.moveTo(c.x, c.y), n.lineTo(c.x + 9 * Math.cos(.0174533 * c.rotation), c.y + 9 * Math.sin(.0174533 * c.rotation)), n.strokeStyle = "black", n.lineWidth = 4.5, n.stroke(), n.strokeStyle = "red", n.lineWidth = 3, n.stroke(), n.closePath() } return n.restore(), r }, e._solveGuideData = function (t, n) { var i; if (i = e.debug(t)) return i; var r = n.path = t.path; n.orient = t.orient; n.subLines = [], n.totalLength = 0, n.startOffsetRot = 0, n.deltaRotation = 0, n.startData = { ratio: 0 }, n.endData = { ratio: 1 }, n.animSpan = 1; var s, a, o, u, c, l, h, p, d, f = r.length, _ = {}; for (s = r[0], a = r[1], h = 2; h < f; h += 4) { o = r[h], u = r[h + 1], c = r[h + 2], l = r[h + 3]; var v = { weightings: [], estLength: 0, portion: 0 }, g = s, m = a; for (p = 1; p <= 10; p++) { e._getParamsForCurve(s, a, o, u, c, l, p / 10, !1, _); var w = _.x - g, T = _.y - m; d = Math.sqrt(w * w + T * T), v.weightings.push(d), v.estLength += d, g = _.x, m = _.y } for (n.totalLength += v.estLength, p = 0; p < 10; p++)d = v.estLength, v.weightings[p] = v.weightings[p] / d; n.subLines.push(v), s = c, a = l } d = n.totalLength; var b = n.subLines.length; for (h = 0; h < b; h++)n.subLines[h].portion = n.subLines[h].estLength / d; var P = isNaN(t.start) ? 0 : t.start, j = isNaN(t.end) ? 1 : t.end; e._ratioToPositionData(P, n, n.startData), e._ratioToPositionData(j, n, n.endData), n.startData.ratio = P, n.endData.ratio = j, n.animSpan = n.endData.ratio - n.startData.ratio }, e._ratioToPositionData = function (t, n, i) { var r, s, a, o, u, c = n.subLines, l = 0, h = t * n.animSpan + n.startData.ratio; for (s = c.length, r = 0; r < s; r++) { if (l + (o = c[r].portion) >= h) { u = r; break } l += o } void 0 === u && (u = s - 1, l -= o); var p = c[u].weightings, d = o; for (s = p.length, r = 0; r < s && !(l + (o = p[r] * d) >= h); r++)l += o; u = 4 * u + 2, a = r / 10 + (h - l) / o * .1; var f = n.path; return e._getParamsForCurve(f[u - 2], f[u - 1], f[u], f[u + 1], f[u + 2], f[u + 3], a, n.orient, i), n.orient && (t >= .99999 && t <= 1.00001 && void 0 !== n.endAbsRot ? i.rotation = n.endAbsRot : i.rotation += n.startOffsetRot + t * n.deltaRotation), i }, e._getParamsForCurve = function (t, e, n, i, r, s, a, o, u) { var c = 1 - a; u.x = c * c * t + 2 * c * a * n + a * a * r, u.y = c * c * e + 2 * c * a * i + a * a * s, o && (u.rotation = 57.2957795 * Math.atan2((i - e) * c + (s - i) * a, (n - t) * c + (r - n) * a)) }, e._findPathProblems = function (t) { var e = t.path, n = e && e.length || 0; if (n < 6 || (n - 2) % 4) { var i = "\tCannot parse 'path' array due to invalid number of entries in path. "; return i += "There should be an odd number of points, at least 3 points, and 2 entries per point (x & y). ", i += "See 'CanvasRenderingContext2D.quadraticCurveTo' for details as 'path' models a quadratic bezier.\n\n", i += "Only [ " + n + " ] values found. Expected: " + Math.max(4 * Math.ceil((n - 2) / 4) + 2, 6) } for (var r = 0; r < n; r++)if (isNaN(e[r])) return "All data in path array must be numeric"; var s = t.start; if (isNaN(s) && void 0 !== s) return "'start' out of bounds. Expected 0 to 1, got: " + s; var a = t.end; if (isNaN(a) && void 0 !== a) return "'end' out of bounds. Expected 0 to 1, got: " + a; var o = t.orient; return o && "fixed" != o && "auto" != o && "cw" != o && "ccw" != o ? 'Invalid orientation value. Expected ["fixed", "auto", "cw", "ccw", undefined], got: ' + o : void 0 }, createjs.MotionGuidePlugin = t }(), this.createjs = this.createjs || {}, function () { "use strict"; var t = createjs.TweenJS = createjs.TweenJS || {}; t.version = "1.0.0", t.buildDate = "Thu, 14 Sep 2017 19:47:47 GMT" }();

// MY TWEEN
function Tween(target, props, duration, callback) {
    duration = duration || 1000;
    callback = callback || function () { };
    createjs.Tween.get(target).to(props, duration, createjs.Ease.linear).call(callback);
}

const _PLAYER_MOVESPEED = 5;
const _ASTEROID_COUNT = 5;
const _ASTEROID_SPAWN_CHANCE = 0.012;
const _ASTEROID_MIN_SPEED = 0.5;
const _ASTEROID_MAX_SPEED = 2.5;
const _ASTEROID_MIN_ROTATE = -2.5;
const _ASTEROID_MAX_ROTATE = 2.5;

var _CANVAS_ID = 'game-canvas';

var images = new function () {

    // Background
    this.background = new Image();
    this.background.src = 'images/game/bg.png';

    this.player = new Image();
    this.player.src = 'images/game/player.png';

    this.exhaust = new Image();
    this.exhaust.src = 'images/game/exhaust.png';

    this.asteroid1 = new Image();
    this.asteroid1.src = 'images/game/asteroid1.png';

    this.asteroid2 = new Image();
    this.asteroid2.src = 'images/game/asteroid2.png';
}

function Drawable() {
    this.init = function (x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    this.speed = 0;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    // Define abstract function to be implemented in child objects
    this.draw = function () { };
}

function Background(x, y) {
    this.speed = 1.5; // Background panning speed

    this.draw = function () {
        // Panning
        this.x -= this.speed;

        this.context.drawImage(images.background, this.x, this.y);
        // Draw another image at the top edge of the first image
        this.context.drawImage(images.background, this.x + this.canvasWidth, this.y);

        if (this.x <= -this.canvasWidth)
            this.x = 0;
    };
}

function Player() {
    this.image = images.player;
    this.width = this.image.width;
    this.height = this.image.height;

    // Exhaust image
    this.exhaustFrame = 0;
    this.imageExhaust = images.exhaust;

    this.update = function () {

        // Update exhaust frame
        this.now = new Date().getTime();
        if (!this._lastExhaustFrameUpdate || Math.abs(this._lastExhaustFrameUpdate - this.now) > 1000 / 10) {
            this.exhaustFrame++;
            this._lastExhaustFrameUpdate = new Date(this.now).getTime();
        }
        if (this.exhaustFrame >= 2)
            this.exhaustFrame = 0;
    };

    this.draw = function () {
        this.update();

        // main ship
        this.context.drawImage(this.image, this.x, this.y);

        // Exhaust animation
        this.context.drawImage(this.imageExhaust, 0 + (this.exhaustFrame * (this.imageExhaust.width / 2)), 0, this.imageExhaust.width / 2, this.imageExhaust.height, this.x - this.width * 0.48, this.y - this.height * 0.18, this.imageExhaust.width / 2, this.imageExhaust.height);

    };

    this.moveUp = function () {
        if (this.y <= 0) return;
        this.y = this.y - _PLAYER_MOVESPEED;
    };
    this.moveLeft = function () {
        if (this.x <= 0) return;
        this.x = this.x - _PLAYER_MOVESPEED;
    };
    this.moveDown = function () {
        if (this.y + this.height >= this.canvasHeight) return;
        this.y = this.y + _PLAYER_MOVESPEED;
    };
    this.moveRight = function () {
        if (this.x + this.height >= this.canvasWidth) return;
        this.x = this.x + _PLAYER_MOVESPEED;
    };
}

function Asteroid() {
    this.image = Math.random() < 0.5 ? images.asteroid1 : images.asteroid2;
    this.width = this.image.width;
    this.height = this.image.height;
    this.rotationSpeed = Math.random() * (_ASTEROID_MAX_ROTATE - _ASTEROID_MIN_ROTATE) + _ASTEROID_MIN_ROTATE;
    this.xSpeed = Math.random() * (_ASTEROID_MAX_SPEED - _ASTEROID_MIN_SPEED) + _ASTEROID_MIN_SPEED;
    this.ySpeed = Math.random() * (_ASTEROID_MAX_SPEED - -_ASTEROID_MAX_SPEED) + -_ASTEROID_MAX_SPEED;
    this.rotate = Math.random() * (360 - 0) + 0;

    this.update = function () {
        this.x -= this.xSpeed;
        this.rotate += this.rotationSpeed;

        if (this.x + this.width < 0 && !this.isDead) {
            this.isDead = true;
        } else this.x -= this.xSpeed;
    };

    this.draw = function () {
        this.update();

        this.context.save();

        // asteroid
        // this.context.rotate(this.rotate * Math.PI / 180);
        this.context.translate(this.x, this.y);
        this.context.rotate(this.rotate * Math.PI / 180);
        this.context.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);

        this.context.restore();
    };

    this.respawnRight = function () {
        this.isDead = false;
        // randomly spawn on the right
        this.init(this.canvasWidth * 1.2, Math.random() * (this.canvasHeight * 0.95 - this.canvasHeight * -0.1) + this.canvasHeight * -0.1);
    }
}

Background.prototype = new Drawable();
Player.prototype = new Drawable();
Asteroid.prototype = new Drawable();


function SpaceGame() {

    this.keysDown = [];
    this.asteroids = [];

    this.init = function () {
        // Get the canvas element
        this.bgCanvas = document.getElementById(_CANVAS_ID);
        // Test to see if canvas is supported
        if (this.bgCanvas.getContext) {
            this.bgContext = this.bgCanvas.getContext('2d');
            // Initialize objects to contain their context and canvas
            // information
            Background.prototype.context = this.bgContext;
            Background.prototype.canvasWidth = this.bgCanvas.width;
            Background.prototype.canvasHeight = this.bgCanvas.height;
            Player.prototype.context = this.bgContext;
            Player.prototype.canvasWidth = this.bgCanvas.width;
            Player.prototype.canvasHeight = this.bgCanvas.height;
            Asteroid.prototype.context = this.bgContext;
            Asteroid.prototype.canvasWidth = this.bgCanvas.width;
            Asteroid.prototype.canvasHeight = this.bgCanvas.height;

            // Initialize assets
            this.background = new Background(0, 0);
            this.background.init(0, 0);
            this.player = new Player();
            this.player.init(this.player.canvasWidth / 2 - this.player.width / 2, this.player.canvasHeight / 2 - this.player.height / 2);
            this.spawnAsteroid();
            return true;
        } else {
            return false;
        }
    };

    // Game start
    this.start = function () {
        animate();
    };

    // Game update
    this.update = function () {
        this.keyHandler();
        this.trySpawnAsteroids();
    };

    // Game draw
    this.draw = function () {
        this.update();

        this.background.draw();

        // Astroids
        for (var i = 0; i < this.asteroids.length; i++)
            if (this.asteroids[i] && !this.asteroids[i].isDead)
                this.asteroids[i].draw();


        this.player.draw();
    };

    this.addKeyDown = function (key, keyCode) {
        key = key || keyCode;
        if (this.keysDown.indexOf(key) > -1) return;
        this.keysDown.push(key);
    };
    this.removeKeyUp = function (key, keyCode) {
        key = key || keyCode;
        if (this.keysDown.indexOf(key) < 0) return;
        this.keysDown.splice(this.keysDown.indexOf(key), 1);
    };
    this.keysDownHas = function (key, keyCode) {
        key = key || keyCode;
        return this.keysDown.indexOf(key) > -1 ? true : false;
    };
    this.keyHandler = function () {
        // Pressed UP
        if (this.keysDownHas('w') || this.keysDownHas(119)) {

            // move player up
            theGame.player.moveUp();

            // Move DOWN
        } else if (this.keysDownHas('s') || this.keysDownHas(115)) {

            // move player down
            theGame.player.moveDown();


        }
        // Pressed LEFT
        if (this.keysDownHas('a') || this.keysDownHas(97)) {

            // Move left
            theGame.player.moveLeft();

            // Pressed RIGHT
        } else if (this.keysDownHas('d') || this.keysDownHas(100)) {

            // Move left
            theGame.player.moveRight();
        }
    };

    this.trySpawnAsteroids = function () {

        if (Math.random() > _ASTEROID_SPAWN_CHANCE) return;

        let astroid = this.checkThereIsDeadAstroid();

        // respawn dead astroid
        if (typeof astroid != 'boolean' && astroid.isDead) {
            // respawn dead astroid
            astroid.respawnRight();
            // spawn new astroid
        } else if (typeof astroid != 'boolean') {
            this.asteroids.push(this.spawnAsteroid());
        }
    }

    this.checkThereIsDeadAstroid = function () {
        for (var i = 0; i < this.asteroids.length; i++)
            if (this.asteroids[i] && this.asteroids[i].isDead)
                return this.asteroids[i];

        if (this.asteroids.length < _ASTEROID_COUNT) return this.asteroids.length;
        return false;
    }

    this.spawnAsteroid = function () {
        let newAstroid = new Asteroid();
        newAstroid.respawnRight();

        return newAstroid;
    }


}

function animate() {
    requestAnimFrame(animate);
    theGame.draw();
}

function onKeyPressed(e) {
    let key = e.key || '';
    key = key.toLowerCase();
    const keyCode = e.keyCode || e.which;
    theGame.addKeyDown(key, keyCode);
}
function onKeyUp(e) {
    let key = e.key || '';
    key = key.toLowerCase();
    const keyCode = e.keyCode || e.which;
    theGame.removeKeyUp(key, keyCode);
}

var theGame = null;
function initializeGameBackground() {
    if (!document.getElementById(_CANVAS_ID))
        return setTimeout(initializeGameBackground, 500);

    window.addEventListener("keydown", onKeyPressed, true)
    window.addEventListener("keyup", onKeyUp, true)

    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    theGame = new SpaceGame();
    theGame.init();
    theGame.start();
}
initializeGameBackground();
