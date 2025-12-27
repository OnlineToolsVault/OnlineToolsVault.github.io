import { c as U, g as W, r as D, R as H, j as f } from "./index-Cw2n8EIY.js";
import { R as N } from "./RelatedTools-OXYLR9lD.js";
import { T as F } from "./ToolLayout-C--xt8Yy.js";
import { C as j } from "./copy-Ctq4kbqA.js";
import { A } from "./alert-circle-chSh-Ugx.js";
import "./tools-BSWx8mU_.js";
import "./type-BSieyaqx.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const I = U("RotateCcw", [["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }], ["path", { d: "M3 3v5h5", key: "1xhq8a" }]]);
var R = { exports: {} };
(function(X, C) {
  (function(T, O) {
    X.exports = O();
  })(globalThis, () => (() => {
    var E = { 949: (v, l, p) => {
      Object.defineProperty(l, "__esModule", { value: true }), l.CronParser = void 0;
      var o = p(515), g = function() {
        function m(t, e, n) {
          e === void 0 && (e = true), n === void 0 && (n = false), this.expression = t, this.dayOfWeekStartIndexZero = e, this.monthStartIndexZero = n;
        }
        return m.prototype.parse = function() {
          var t, e, n = (t = this.expression) !== null && t !== void 0 ? t : "";
          if (n === "@reboot") return e = ["@reboot", "", "", "", "", "", ""], e;
          if (n.startsWith("@")) {
            var r = this.parseSpecial(this.expression);
            e = this.extractParts(r);
          } else e = this.extractParts(this.expression);
          return this.normalize(e), this.validate(e), e;
        }, m.prototype.parseSpecial = function(t) {
          var e = { "@yearly": "0 0 1 1 *", "@annually": "0 0 1 1 *", "@monthly": "0 0 1 * *", "@weekly": "0 0 * * 0", "@daily": "0 0 * * *", "@midnight": "0 0 * * *", "@hourly": "0 * * * *", "@reboot": "@reboot" }, n = e[t];
          if (!n) throw new Error("Unknown special expression.");
          return n;
        }, m.prototype.extractParts = function(t) {
          if (!this.expression) throw new Error("cron expression is empty");
          for (var e = t.trim().split(/[ ]+/), n = 0; n < e.length; n++) if (e[n].includes(",")) {
            var r = e[n].split(",").map(function(a) {
              return a.trim();
            }).filter(function(a) {
              return a !== "";
            }).map(function(a) {
              return isNaN(Number(a)) ? a : Number(a);
            }).filter(function(a) {
              return a !== null && a !== "";
            });
            r.length === 0 && r.push("*"), r.sort(function(a, s) {
              return a !== null && s !== null ? a - s : 0;
            }), e[n] = r.map(function(a) {
              return a !== null ? a.toString() : "";
            }).join(",");
          }
          if (e.length < 5) throw new Error("Expression has only ".concat(e.length, " part").concat(e.length == 1 ? "" : "s", ". At least 5 parts are required."));
          if (e.length == 5) e.unshift(""), e.push("");
          else if (e.length == 6) {
            var i = /\d{4}$/.test(e[5]) || e[4] == "?" || e[2] == "?";
            i ? e.unshift("") : e.push("");
          } else if (e.length > 7) throw new Error("Expression has ".concat(e.length, " parts; too many!"));
          return e;
        }, m.prototype.normalize = function(t) {
          var e = this;
          if (t[3] = t[3].replace("?", "*"), t[5] = t[5].replace("?", "*"), t[2] = t[2].replace("?", "*"), t[0].indexOf("0/") == 0 && (t[0] = t[0].replace("0/", "*/")), t[1].indexOf("0/") == 0 && (t[1] = t[1].replace("0/", "*/")), t[2].indexOf("0/") == 0 && (t[2] = t[2].replace("0/", "*/")), t[3].indexOf("1/") == 0 && (t[3] = t[3].replace("1/", "*/")), t[4].indexOf("1/") == 0 && (t[4] = t[4].replace("1/", "*/")), t[6].indexOf("1/") == 0 && (t[6] = t[6].replace("1/", "*/")), t[5] = t[5].replace(/(^\d)|([^#/\s]\d)/g, function(c) {
            var y = c.replace(/\D/, ""), d = y;
            return e.dayOfWeekStartIndexZero ? y == "7" && (d = "0") : d = (parseInt(y) - 1).toString(), c.replace(y, d);
          }), t[5] == "L" && (t[5] = "6"), t[3] == "?" && (t[3] = "*"), t[3].indexOf("W") > -1 && (t[3].indexOf(",") > -1 || t[3].indexOf("-") > -1)) throw new Error("The 'W' character can be specified only when the day-of-month is a single day, not a range or list of days.");
          var n = { SUN: 0, MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6 };
          for (var r in n) t[5] = t[5].replace(new RegExp(r, "gi"), n[r].toString());
          t[4] = t[4].replace(/(^\d{1,2})|([^#/\s]\d{1,2})/g, function(c) {
            var y = c.replace(/\D/, ""), d = y;
            return e.monthStartIndexZero && (d = (parseInt(y) + 1).toString()), c.replace(y, d);
          });
          var i = { JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6, JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12 };
          for (var a in i) t[4] = t[4].replace(new RegExp(a, "gi"), i[a].toString());
          t[0] == "0" && (t[0] = ""), !/\*|\-|\,|\//.test(t[2]) && (/\*|\//.test(t[1]) || /\*|\//.test(t[0])) && (t[2] += "-".concat(t[2]));
          for (var s = 0; s < t.length; s++) if (t[s].indexOf(",") != -1 && (t[s] = t[s].split(",").filter(function(c) {
            return c !== "";
          }).join(",") || "*"), t[s] == "*/1" && (t[s] = "*"), t[s].indexOf("/") > -1 && !/^\*|\-|\,/.test(t[s])) {
            var u = null;
            switch (s) {
              case 4:
                u = "12";
                break;
              case 5:
                u = "6";
                break;
              case 6:
                u = "9999";
                break;
              default:
                u = null;
                break;
            }
            if (u !== null) {
              var h = t[s].split("/");
              t[s] = "".concat(h[0], "-").concat(u, "/").concat(h[1]);
            }
          }
        }, m.prototype.validate = function(t) {
          var e = "0-9,\\-*/";
          this.validateOnlyExpectedCharactersFound(t[0], e), this.validateOnlyExpectedCharactersFound(t[1], e), this.validateOnlyExpectedCharactersFound(t[2], e), this.validateOnlyExpectedCharactersFound(t[3], "0-9,\\-*/LW"), this.validateOnlyExpectedCharactersFound(t[4], e), this.validateOnlyExpectedCharactersFound(t[5], "0-9,\\-*/L#"), this.validateOnlyExpectedCharactersFound(t[6], e), this.validateAnyRanges(t);
        }, m.prototype.validateAnyRanges = function(t) {
          o.default.secondRange(t[0]), o.default.minuteRange(t[1]), o.default.hourRange(t[2]), o.default.dayOfMonthRange(t[3]), o.default.monthRange(t[4], this.monthStartIndexZero), o.default.dayOfWeekRange(t[5], this.dayOfWeekStartIndexZero);
        }, m.prototype.validateOnlyExpectedCharactersFound = function(t, e) {
          var n = t.match(new RegExp("[^".concat(e, "]+"), "gi"));
          if (n && n.length) throw new Error("Expression contains invalid values: '".concat(n.toString(), "'"));
        }, m;
      }();
      l.CronParser = g;
    }, 333: (v, l, p) => {
      Object.defineProperty(l, "__esModule", { value: true }), l.ExpressionDescriptor = void 0;
      var o = p(823), g = p(949), m = function() {
        function t(e, n) {
          if (this.expression = e, this.options = n, this.expressionParts = new Array(5), !this.options.locale && t.defaultLocale && (this.options.locale = t.defaultLocale), !t.locales[this.options.locale]) {
            var r = Object.keys(t.locales)[0];
            console.warn("Locale '".concat(this.options.locale, "' could not be found; falling back to '").concat(r, "'.")), this.options.locale = r;
          }
          this.i18n = t.locales[this.options.locale], n.use24HourTimeFormat === void 0 && (n.use24HourTimeFormat = this.i18n.use24HourTimeFormatByDefault());
        }
        return t.toString = function(e, n) {
          var r = n === void 0 ? {} : n, i = r.throwExceptionOnParseError, a = i === void 0 ? true : i, s = r.verbose, u = s === void 0 ? false : s, h = r.dayOfWeekStartIndexZero, c = h === void 0 ? true : h, y = r.monthStartIndexZero, d = y === void 0 ? false : y, b = r.use24HourTimeFormat, x = r.locale, k = x === void 0 ? null : x, S = r.logicalAndDayFields, _ = S === void 0 ? false : S, w = { throwExceptionOnParseError: a, verbose: u, dayOfWeekStartIndexZero: c, monthStartIndexZero: d, use24HourTimeFormat: b, locale: k, logicalAndDayFields: _ };
          w.tzOffset && console.warn("'tzOffset' option has been deprecated and is no longer supported.");
          var L = new t(e, w);
          return L.getFullDescription();
        }, t.initialize = function(e, n) {
          n === void 0 && (n = "en"), t.specialCharacters = ["/", "-", ",", "*"], t.defaultLocale = n, e.load(t.locales);
        }, t.prototype.getFullDescription = function() {
          var e, n, r = "";
          try {
            var i = new g.CronParser(this.expression, this.options.dayOfWeekStartIndexZero, this.options.monthStartIndexZero);
            if (this.expressionParts = i.parse(), this.expressionParts[0] === "@reboot") return ((n = (e = this.i18n).atReboot) === null || n === void 0 ? void 0 : n.call(e)) || "Run once, at startup";
            var a = this.getTimeOfDayDescription(), s = this.getDayOfMonthDescription(), u = this.getMonthDescription(), h = this.getDayOfWeekDescription(), c = this.getYearDescription();
            r += a + s + h + u + c, r = this.transformVerbosity(r, !!this.options.verbose), r = r.charAt(0).toLocaleUpperCase() + r.substr(1);
          } catch (y) {
            if (!this.options.throwExceptionOnParseError) r = this.i18n.anErrorOccuredWhenGeneratingTheExpressionD();
            else throw "".concat(y);
          }
          return r;
        }, t.prototype.getTimeOfDayDescription = function() {
          var e = this.expressionParts[0], n = this.expressionParts[1], r = this.expressionParts[2], i = "";
          if (!o.StringUtilities.containsAny(n, t.specialCharacters) && !o.StringUtilities.containsAny(r, t.specialCharacters) && !o.StringUtilities.containsAny(e, t.specialCharacters)) i += this.i18n.atSpace() + this.formatTime(r, n, e);
          else if (!e && n.indexOf("-") > -1 && !(n.indexOf(",") > -1) && !(n.indexOf("/") > -1) && !o.StringUtilities.containsAny(r, t.specialCharacters)) {
            var a = n.split("-");
            i += o.StringUtilities.format(this.i18n.everyMinuteBetweenX0AndX1(), this.formatTime(r, a[0], ""), this.formatTime(r, a[1], ""));
          } else if (!e && r.indexOf(",") > -1 && r.indexOf("-") == -1 && r.indexOf("/") == -1 && !o.StringUtilities.containsAny(n, t.specialCharacters)) {
            var s = r.split(",");
            i += this.i18n.at();
            for (var u = 0; u < s.length; u++) i += " ", i += this.formatTime(s[u], n, ""), u < s.length - 2 && (i += ","), u == s.length - 2 && (i += this.i18n.spaceAnd());
          } else {
            var h = this.getSecondsDescription(), c = this.getMinutesDescription(), y = this.getHoursDescription();
            if (i += h, i && c && (i += ", "), i += c, c === y) return i;
            i && y && (i += ", "), i += y;
          }
          return i;
        }, t.prototype.getSecondsDescription = function() {
          var e = this, n = this.getSegmentDescription(this.expressionParts[0], this.i18n.everySecond(), function(r) {
            return r;
          }, function(r) {
            return o.StringUtilities.format(e.i18n.everyX0Seconds(r), r);
          }, function(r) {
            return e.i18n.secondsX0ThroughX1PastTheMinute();
          }, function(r) {
            return r == "0" ? "" : parseInt(r) < 20 ? e.i18n.atX0SecondsPastTheMinute(r) : e.i18n.atX0SecondsPastTheMinuteGt20() || e.i18n.atX0SecondsPastTheMinute(r);
          });
          return n;
        }, t.prototype.getMinutesDescription = function() {
          var e = this, n = this.expressionParts[0], r = this.expressionParts[2], i = this.getSegmentDescription(this.expressionParts[1], this.i18n.everyMinute(), function(a) {
            return a;
          }, function(a) {
            return o.StringUtilities.format(e.i18n.everyX0Minutes(a), a);
          }, function(a) {
            return e.i18n.minutesX0ThroughX1PastTheHour();
          }, function(a) {
            try {
              return a == "0" && r.indexOf("/") == -1 && n == "" ? e.i18n.everyHour() : parseInt(a) < 20 ? e.i18n.atX0MinutesPastTheHour(a) : e.i18n.atX0MinutesPastTheHourGt20() || e.i18n.atX0MinutesPastTheHour(a);
            } catch {
              return e.i18n.atX0MinutesPastTheHour(a);
            }
          });
          return i;
        }, t.prototype.getHoursDescription = function() {
          var e = this, n = this.expressionParts[2], r = 0, i = [];
          n.split("/")[0].split(",").forEach(function(u) {
            var h = u.split("-");
            h.length === 2 && i.push({ value: h[1], index: r + 1 }), r += h.length;
          });
          var a = 0, s = this.getSegmentDescription(n, this.i18n.everyHour(), function(u) {
            var h = i.find(function(y) {
              return y.value === u && y.index === a;
            }), c = h && e.expressionParts[1] !== "0";
            return a++, c ? e.formatTime(u, "59", "") : e.formatTime(u, "0", "");
          }, function(u) {
            return o.StringUtilities.format(e.i18n.everyX0Hours(u), u);
          }, function(u) {
            return e.i18n.betweenX0AndX1();
          }, function(u) {
            return e.i18n.atX0();
          });
          return s;
        }, t.prototype.getDayOfWeekDescription = function() {
          var e = this, n = this.i18n.daysOfTheWeek(), r = null;
          return this.expressionParts[5] == "*" ? r = "" : r = this.getSegmentDescription(this.expressionParts[5], this.i18n.commaEveryDay(), function(i, a) {
            var s = i;
            i.indexOf("#") > -1 ? s = i.substring(0, i.indexOf("#")) : i.indexOf("L") > -1 && (s = s.replace("L", ""));
            var u = parseInt(s), h = e.i18n.daysOfTheWeekInCase ? e.i18n.daysOfTheWeekInCase(a)[u] : n[u];
            if (i.indexOf("#") > -1) {
              var c = null, y = i.substring(i.indexOf("#") + 1), d = i.substring(0, i.indexOf("#"));
              switch (y) {
                case "1":
                  c = e.i18n.first(d);
                  break;
                case "2":
                  c = e.i18n.second(d);
                  break;
                case "3":
                  c = e.i18n.third(d);
                  break;
                case "4":
                  c = e.i18n.fourth(d);
                  break;
                case "5":
                  c = e.i18n.fifth(d);
                  break;
              }
              h = c + " " + h;
            }
            return h;
          }, function(i) {
            return parseInt(i) == 1 ? "" : o.StringUtilities.format(e.i18n.commaEveryX0DaysOfTheWeek(i), i);
          }, function(i) {
            var a = i.substring(0, i.indexOf("-")), s = e.expressionParts[3] != "*";
            return s ? e.i18n.commaAndX0ThroughX1(a) : e.i18n.commaX0ThroughX1(a);
          }, function(i) {
            var a = null;
            if (i.indexOf("#") > -1) {
              var s = i.substring(i.indexOf("#") + 1), u = i.substring(0, i.indexOf("#"));
              a = e.i18n.commaOnThe(s, u).trim() + e.i18n.spaceX0OfTheMonth();
            } else if (i.indexOf("L") > -1) a = e.i18n.commaOnTheLastX0OfTheMonth(i.replace("L", ""));
            else {
              var h = e.expressionParts[3] != "*";
              h ? e.options.logicalAndDayFields ? a = e.i18n.commaOnlyOnX0(i) : a = e.i18n.commaAndOnX0() : a = e.i18n.commaOnlyOnX0(i);
            }
            return a;
          }), r;
        }, t.prototype.getMonthDescription = function() {
          var e = this, n = this.i18n.monthsOfTheYear(), r = this.getSegmentDescription(this.expressionParts[4], "", function(i, a) {
            return a && e.i18n.monthsOfTheYearInCase ? e.i18n.monthsOfTheYearInCase(a)[parseInt(i) - 1] : n[parseInt(i) - 1];
          }, function(i) {
            return parseInt(i) == 1 ? "" : o.StringUtilities.format(e.i18n.commaEveryX0Months(i), i);
          }, function(i) {
            return e.i18n.commaMonthX0ThroughMonthX1() || e.i18n.commaX0ThroughX1();
          }, function(i) {
            return e.i18n.commaOnlyInMonthX0 ? e.i18n.commaOnlyInMonthX0() : e.i18n.commaOnlyInX0();
          });
          return r;
        }, t.prototype.getDayOfMonthDescription = function() {
          var e = this, n = null, r = this.expressionParts[3];
          switch (r) {
            case "L":
              n = this.i18n.commaOnTheLastDayOfTheMonth();
              break;
            case "WL":
            case "LW":
              n = this.i18n.commaOnTheLastWeekdayOfTheMonth();
              break;
            default:
              var i = r.match(/(\d{1,2}W)|(W\d{1,2})/);
              if (i) {
                var a = parseInt(i[0].replace("W", "")), s = a == 1 ? this.i18n.firstWeekday() : o.StringUtilities.format(this.i18n.weekdayNearestDayX0(), a.toString());
                n = o.StringUtilities.format(this.i18n.commaOnTheX0OfTheMonth(), s);
                break;
              } else {
                var u = r.match(/L-(\d{1,2})/);
                if (u) {
                  var h = u[1];
                  n = o.StringUtilities.format(this.i18n.commaDaysBeforeTheLastDayOfTheMonth(h), h);
                  break;
                } else {
                  if (r == "*" && this.expressionParts[5] != "*") return "";
                  n = this.getSegmentDescription(r, this.i18n.commaEveryDay(), function(c) {
                    return c == "L" ? e.i18n.lastDay() : e.i18n.dayX0 ? o.StringUtilities.format(e.i18n.dayX0(), c) : c;
                  }, function(c) {
                    return c == "1" ? e.i18n.commaEveryDay() : e.i18n.commaEveryX0Days(c);
                  }, function(c) {
                    return e.i18n.commaBetweenDayX0AndX1OfTheMonth(c);
                  }, function(c) {
                    return e.i18n.commaOnDayX0OfTheMonth(c);
                  });
                }
                break;
              }
          }
          return n;
        }, t.prototype.getYearDescription = function() {
          var e = this, n = this.getSegmentDescription(this.expressionParts[6], "", function(r) {
            return /^\d+$/.test(r) ? new Date(parseInt(r), 1).getFullYear().toString() : r;
          }, function(r) {
            return o.StringUtilities.format(e.i18n.commaEveryX0Years(r), r);
          }, function(r) {
            return e.i18n.commaYearX0ThroughYearX1() || e.i18n.commaX0ThroughX1();
          }, function(r) {
            return e.i18n.commaOnlyInYearX0 ? e.i18n.commaOnlyInYearX0() : e.i18n.commaOnlyInX0();
          });
          return n;
        }, t.prototype.getSegmentDescription = function(e, n, r, i, a, s) {
          var u = null, h = e.indexOf("/") > -1, c = e.indexOf("-") > -1, y = e.indexOf(",") > -1;
          if (!e) u = "";
          else if (e === "*") u = n;
          else if (!h && !c && !y) u = o.StringUtilities.format(s(e), r(e));
          else if (y) {
            for (var d = e.split(","), b = "", x = 0; x < d.length; x++) if (x > 0 && d.length > 2 && (b += ",", x < d.length - 1 && (b += " ")), x > 0 && d.length > 1 && (x == d.length - 1 || d.length == 2) && (b += "".concat(this.i18n.spaceAnd(), " ")), d[x].indexOf("/") > -1 || d[x].indexOf("-") > -1) {
              var k = d[x].indexOf("-") > -1 && d[x].indexOf("/") == -1, S = this.getSegmentDescription(d[x], n, r, i, k ? this.i18n.commaX0ThroughX1 : a, s);
              k && (S = S.replace(", ", "")), b += S;
            } else h ? b += this.getSegmentDescription(d[x], n, r, i, a, s) : b += r(d[x]);
            h ? u = b : u = o.StringUtilities.format(s(e), b);
          } else if (h) {
            var d = e.split("/");
            if (u = o.StringUtilities.format(i(d[1]), d[1]), d[0].indexOf("-") > -1) {
              var _ = this.generateRangeSegmentDescription(d[0], a, r);
              _.indexOf(", ") != 0 && (u += ", "), u += _;
            } else if (d[0].indexOf("*") == -1) {
              var w = o.StringUtilities.format(s(d[0]), r(d[0]));
              w = w.replace(", ", ""), u += o.StringUtilities.format(this.i18n.commaStartingX0(), w);
            }
          } else c && (u = this.generateRangeSegmentDescription(e, a, r));
          return u;
        }, t.prototype.generateRangeSegmentDescription = function(e, n, r) {
          var i = "", a = e.split("-"), s = r(a[0], 1), u = r(a[1], 2), h = n(e);
          return i += o.StringUtilities.format(h, s, u), i;
        }, t.prototype.formatTime = function(e, n, r) {
          var i = 0, a = 0, s = parseInt(e) + i, u = parseInt(n) + a;
          u >= 60 ? (u -= 60, s += 1) : u < 0 && (u += 60, s -= 1), s >= 24 ? s = s - 24 : s < 0 && (s = 24 + s);
          var h = "", c = false;
          this.options.use24HourTimeFormat || (c = !!(this.i18n.setPeriodBeforeTime && this.i18n.setPeriodBeforeTime()), h = c ? "".concat(this.getPeriod(s), " ") : " ".concat(this.getPeriod(s)), s > 12 && (s -= 12), s === 0 && (s = 12));
          var y = "";
          return r && (y = ":".concat(("00" + r).substring(r.length))), "".concat(c ? h : "").concat(("00" + s.toString()).substring(s.toString().length), ":").concat(("00" + u.toString()).substring(u.toString().length)).concat(y).concat(c ? "" : h);
        }, t.prototype.transformVerbosity = function(e, n) {
          if (!n && (e = e.replace(new RegExp(", ".concat(this.i18n.everyMinute()), "g"), ""), e = e.replace(new RegExp(", ".concat(this.i18n.everyHour()), "g"), ""), e = e.replace(new RegExp(this.i18n.commaEveryDay(), "g"), ""), e = e.replace(/\, ?$/, ""), this.i18n.conciseVerbosityReplacements)) for (var r = 0, i = Object.entries(this.i18n.conciseVerbosityReplacements()); r < i.length; r++) {
            var a = i[r], s = a[0], u = a[1];
            e = e.replace(new RegExp(s, "g"), u);
          }
          return e;
        }, t.prototype.getPeriod = function(e) {
          return e >= 12 ? this.i18n.pm && this.i18n.pm() || "PM" : this.i18n.am && this.i18n.am() || "AM";
        }, t.locales = {}, t;
      }();
      l.ExpressionDescriptor = m;
    }, 747: (v, l, p) => {
      Object.defineProperty(l, "__esModule", { value: true }), l.enLocaleLoader = void 0;
      var o = p(486), g = function() {
        function m() {
        }
        return m.prototype.load = function(t) {
          t.en = new o.en();
        }, m;
      }();
      l.enLocaleLoader = g;
    }, 486: (v, l) => {
      Object.defineProperty(l, "__esModule", { value: true }), l.en = void 0;
      var p = function() {
        function o() {
        }
        return o.prototype.atX0SecondsPastTheMinuteGt20 = function() {
          return null;
        }, o.prototype.atX0MinutesPastTheHourGt20 = function() {
          return null;
        }, o.prototype.commaMonthX0ThroughMonthX1 = function() {
          return null;
        }, o.prototype.commaYearX0ThroughYearX1 = function() {
          return null;
        }, o.prototype.use24HourTimeFormatByDefault = function() {
          return false;
        }, o.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function() {
          return "An error occurred when generating the expression description. Check the cron expression syntax.";
        }, o.prototype.everyMinute = function() {
          return "every minute";
        }, o.prototype.everyHour = function() {
          return "every hour";
        }, o.prototype.atSpace = function() {
          return "At ";
        }, o.prototype.everyMinuteBetweenX0AndX1 = function() {
          return "Every minute between %s and %s";
        }, o.prototype.at = function() {
          return "At";
        }, o.prototype.spaceAnd = function() {
          return " and";
        }, o.prototype.everySecond = function() {
          return "every second";
        }, o.prototype.everyX0Seconds = function() {
          return "every %s seconds";
        }, o.prototype.secondsX0ThroughX1PastTheMinute = function() {
          return "seconds %s through %s past the minute";
        }, o.prototype.atX0SecondsPastTheMinute = function() {
          return "at %s seconds past the minute";
        }, o.prototype.everyX0Minutes = function() {
          return "every %s minutes";
        }, o.prototype.minutesX0ThroughX1PastTheHour = function() {
          return "minutes %s through %s past the hour";
        }, o.prototype.atX0MinutesPastTheHour = function() {
          return "at %s minutes past the hour";
        }, o.prototype.everyX0Hours = function() {
          return "every %s hours";
        }, o.prototype.betweenX0AndX1 = function() {
          return "between %s and %s";
        }, o.prototype.atX0 = function() {
          return "at %s";
        }, o.prototype.commaEveryDay = function() {
          return ", every day";
        }, o.prototype.commaEveryX0DaysOfTheWeek = function() {
          return ", every %s days of the week";
        }, o.prototype.commaX0ThroughX1 = function() {
          return ", %s through %s";
        }, o.prototype.commaAndX0ThroughX1 = function() {
          return ", %s through %s";
        }, o.prototype.first = function() {
          return "first";
        }, o.prototype.second = function() {
          return "second";
        }, o.prototype.third = function() {
          return "third";
        }, o.prototype.fourth = function() {
          return "fourth";
        }, o.prototype.fifth = function() {
          return "fifth";
        }, o.prototype.commaOnThe = function() {
          return ", on the ";
        }, o.prototype.spaceX0OfTheMonth = function() {
          return " %s of the month";
        }, o.prototype.lastDay = function() {
          return "the last day";
        }, o.prototype.commaOnTheLastX0OfTheMonth = function() {
          return ", on the last %s of the month";
        }, o.prototype.commaOnlyOnX0 = function() {
          return ", only on %s";
        }, o.prototype.commaAndOnX0 = function() {
          return ", and on %s";
        }, o.prototype.commaEveryX0Months = function() {
          return ", every %s months";
        }, o.prototype.commaOnlyInX0 = function() {
          return ", only in %s";
        }, o.prototype.commaOnTheLastDayOfTheMonth = function() {
          return ", on the last day of the month";
        }, o.prototype.commaOnTheLastWeekdayOfTheMonth = function() {
          return ", on the last weekday of the month";
        }, o.prototype.commaDaysBeforeTheLastDayOfTheMonth = function() {
          return ", %s days before the last day of the month";
        }, o.prototype.firstWeekday = function() {
          return "first weekday";
        }, o.prototype.weekdayNearestDayX0 = function() {
          return "weekday nearest day %s";
        }, o.prototype.commaOnTheX0OfTheMonth = function() {
          return ", on the %s of the month";
        }, o.prototype.commaEveryX0Days = function() {
          return ", every %s days";
        }, o.prototype.commaBetweenDayX0AndX1OfTheMonth = function() {
          return ", between day %s and %s of the month";
        }, o.prototype.commaOnDayX0OfTheMonth = function() {
          return ", on day %s of the month";
        }, o.prototype.commaEveryHour = function() {
          return ", every hour";
        }, o.prototype.commaEveryX0Years = function() {
          return ", every %s years";
        }, o.prototype.commaStartingX0 = function() {
          return ", starting %s";
        }, o.prototype.daysOfTheWeek = function() {
          return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        }, o.prototype.monthsOfTheYear = function() {
          return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        }, o.prototype.atReboot = function() {
          return "Run once, at startup";
        }, o;
      }();
      l.en = p;
    }, 515: (v, l) => {
      Object.defineProperty(l, "__esModule", { value: true });
      function p(g, m) {
        if (!g) throw new Error(m);
      }
      var o = function() {
        function g() {
        }
        return g.secondRange = function(m) {
          for (var t = m.split(","), e = 0; e < t.length; e++) if (!isNaN(parseInt(t[e], 10))) {
            var n = parseInt(t[e], 10);
            p(n >= 0 && n <= 59, "seconds part must be >= 0 and <= 59");
          }
        }, g.minuteRange = function(m) {
          for (var t = m.split(","), e = 0; e < t.length; e++) if (!isNaN(parseInt(t[e], 10))) {
            var n = parseInt(t[e], 10);
            p(n >= 0 && n <= 59, "minutes part must be >= 0 and <= 59");
          }
        }, g.hourRange = function(m) {
          for (var t = m.split(","), e = 0; e < t.length; e++) if (!isNaN(parseInt(t[e], 10))) {
            var n = parseInt(t[e], 10);
            p(n >= 0 && n <= 23, "hours part must be >= 0 and <= 23");
          }
        }, g.dayOfMonthRange = function(m) {
          for (var t = m.split(","), e = 0; e < t.length; e++) if (!isNaN(parseInt(t[e], 10))) {
            var n = parseInt(t[e], 10);
            p(n >= 1 && n <= 31, "DOM part must be >= 1 and <= 31");
          }
        }, g.monthRange = function(m, t) {
          for (var e = m.split(","), n = 0; n < e.length; n++) if (!isNaN(parseInt(e[n], 10))) {
            var r = parseInt(e[n], 10);
            p(r >= 1 && r <= 12, t ? "month part must be >= 0 and <= 11" : "month part must be >= 1 and <= 12");
          }
        }, g.dayOfWeekRange = function(m, t) {
          for (var e = m.split(","), n = 0; n < e.length; n++) if (!isNaN(parseInt(e[n], 10))) {
            var r = parseInt(e[n], 10);
            p(r >= 0 && r <= 6, t ? "DOW part must be >= 0 and <= 6" : "DOW part must be >= 1 and <= 7");
          }
        }, g;
      }();
      l.default = o;
    }, 823: (v, l) => {
      Object.defineProperty(l, "__esModule", { value: true }), l.StringUtilities = void 0;
      var p = function() {
        function o() {
        }
        return o.format = function(g) {
          for (var m = [], t = 1; t < arguments.length; t++) m[t - 1] = arguments[t];
          return g.replace(/%s/g, function(e) {
            return m.shift();
          });
        }, o.containsAny = function(g, m) {
          return m.some(function(t) {
            return g.indexOf(t) > -1;
          });
        }, o;
      }();
      l.StringUtilities = p;
    } }, T = {};
    function O(v) {
      var l = T[v];
      if (l !== void 0) return l.exports;
      var p = T[v] = { exports: {} };
      return E[v](p, p.exports, O), p.exports;
    }
    var M = {};
    return (() => {
      var v = M;
      Object.defineProperty(v, "__esModule", { value: true }), v.toString = void 0;
      var l = O(333), p = O(747);
      l.ExpressionDescriptor.initialize(new p.enLocaleLoader()), v.default = l.ExpressionDescriptor;
      var o = l.ExpressionDescriptor.toString;
      v.toString = o;
    })(), M;
  })());
})(R);
var z = R.exports;
const B = W(z), Y = [{ title: "Instant Translation", desc: "Type any standard Cron expression and get a human-readable description instantly." }, { title: "Format Validation", desc: "Checks for syntax errors and validates your schedule format." }, { title: "Common Examples", desc: "Quick-start with one-click examples for popular schedules." }], P = [{ question: "What is a Cron expression?", answer: "A Cron expression is a string of 5 or 6 fields separated by spaces that represents a schedule. It is widely used in Unix-based operating systems to schedule jobs (commands or scripts) to run periodically at fixed times, dates, or intervals." }, { question: "How do I read the 5 fields?", answer: "The standard format used here is: `Minute` (0-59), `Hour` (0-23), `Day of Month` (1-31), `Month` (1-12), and `Day of Week` (0-6, where 0 is Sunday). For example, `30 08 * * 1` means 'At 08:30 on Monday'." }, { question: "What special characters are supported?", answer: "You can use `*` (any value), `,` (list separator), `-` (range), and `/` (step values). For example, `*/5` in the minute field means 'every 5 minutes'." }, { question: "Does this tool support Quartz Scheduler or Jenkins syntax?", answer: "This tool is optimized for standard Unix/Linux Cron syntax. While Jenkins is very similar, Quartz has extra fields (Seconds, Year) which might not be fully parsed here. We recommended using standard 5-field syntax." }, { question: "How do I handle timezones?", answer: "Cron jobs run based on the system time of the server they are configured on. This tool translates the expression into a human-readable description assuming the schedule itself is timezone-agnostic. Always check your server's local time setting (e.g., UTC) when deploying." }, { question: "What does * * * * * mean?", answer: "It is the most frequent schedule possible: 'Run every minute, of every hour, of every day, of every month, of every year'." }], $ = () => {
  const [X, C] = D.useState("* * * * *"), [E, T] = D.useState(""), [O, M] = D.useState(null), v = (l) => {
    C(l);
    try {
      const p = B.toString(l);
      T(p), M(null);
    } catch {
      M("Invalid cron expression"), T("");
    }
  };
  return H.useEffect(() => {
    v(X);
  }, []), f.jsx(F, { title: "Cron Expression Parser", description: "Convert Cron expressions into human-readable descriptions.", seoTitle: "Cron Expression Parser - Online Cron to Text", seoDescription: "Free online Cron parser. Translate Cron expressions into plain English. Understand schedule syntax easily.", faqs: P, children: f.jsxs("div", { className: "tool-workspace", style: { minHeight: "80vh", display: "flex", flexDirection: "column" }, children: [f.jsxs("div", { style: { background: "var(--card)", borderRadius: "1rem", border: "1px solid var(--border)", padding: "2rem", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)", maxWidth: "1000px", margin: "0 auto", width: "100%" }, children: [f.jsxs("div", { style: { marginBottom: "2rem" }, children: [f.jsx("label", { htmlFor: "cron-input", style: { display: "block", marginBottom: "0.5rem", fontWeight: "bold" }, children: "Cron Expression" }), f.jsxs("div", { style: { position: "relative", display: "flex", alignItems: "center" }, children: [f.jsx("input", { id: "cron-input", type: "text", value: X, onChange: (l) => v(l.target.value), placeholder: "* * * * *", className: "tool-input", style: { width: "100%", padding: "1rem", paddingRight: "6rem", borderRadius: "0.5rem", border: "1px solid var(--border)", fontSize: "1.2rem", fontFamily: "monospace" } }), f.jsxs("div", { style: { position: "absolute", right: "0.5rem", display: "flex", gap: "0.5rem" }, children: [f.jsx("button", { className: "tool-action-btn-sm", onClick: () => {
    navigator.clipboard.writeText(X);
  }, title: "Copy", style: { padding: "0.5rem", background: "transparent", border: "none", cursor: "pointer", color: "#64748b" }, children: f.jsx(j, { size: 20 }) }), f.jsx("button", { className: "tool-action-btn-sm", onClick: () => v("* * * * *"), title: "Reset", style: { padding: "0.5rem", background: "transparent", border: "none", cursor: "pointer", color: "#64748b" }, children: f.jsx(I, { size: 20 }) })] })] }), f.jsx("div", { style: { marginTop: "0.5rem", fontSize: "0.9rem", color: "#64748b" }, children: "Format: Minute Hour Day Month Weekday" })] }), O && f.jsxs("div", { id: "cron-error", style: { color: "#ef4444", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }, children: [f.jsx(A, { size: 18 }), " ", O] }), E && !O && f.jsxs("div", { id: "cron-result", style: { padding: "1.5rem", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "0.5rem", color: "#166534", fontSize: "1.2rem", fontWeight: "bold", textAlign: "center" }, children: ['"', E, '"'] }), f.jsx("div", { style: { marginTop: "2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: "0.75rem" }, children: ["*/5 * * * *", "0 0 * * *", "0 12 * * MON", "0 0 1 1 *", "0 9 * * 1-5", "*/15 * * * *", "0 0 1 * *", "0 23 * * 5", "30 8 * * *", "0 0 1,15 * *", "*/10 * * * 1-5", "0 0 * * 0", "0 8 1 * *", "0 22 * * 1-5"].map((l, p) => f.jsx("button", { id: `cron-example-btn-${p}`, onClick: () => v(l), className: "tool-example-btn", style: { padding: "0.5rem", border: "1px solid var(--border)", background: "white", borderRadius: "0.25rem", cursor: "pointer", fontSize: "0.9rem" }, children: l }, l)) })] }), f.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [f.jsx(N, {}), f.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [f.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Cron Expression Parser" }), f.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["Working with ", f.jsx("strong", { children: "cron jobs" }), " can be confusing. A single typo in your schedule string can lead to jobs running too often (crashing servers) or not at all (missing backups)."] }), f.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["Our ", f.jsx("strong", { children: "Cron Expression Parser" }), ' acts as a translator. You input the cryptic `* * * * *` string, and we tell you exactly what it means in plain English (e.g., "Every minute").'] }), f.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: "It's the perfect debugging tool for DevOps engineers, system administrators, and developers setting up scheduled tasks on AWS Lambda, Linux servers, or Kubernetes cron jobs." })] }), f.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: Y.map((l, p) => f.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [f.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: p === 0 ? f.jsx(I, { color: "var(--primary)", size: 24 }) : p === 1 ? f.jsx(A, { color: "var(--primary)", size: 24 }) : f.jsx(j, { color: "var(--primary)", size: 24 }) }), f.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: l.title }), f.jsx("p", { style: { color: "var(--text-secondary)" }, children: l.desc })] }, p)) })] })] }) });
};
export {
  $ as default
};
