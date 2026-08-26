import { d as F, r as _, R as U, j as h } from "./index-OUpguYFg.js";
import { R as L } from "./RelatedTools-dQ1AUZ0r.js";
import { T as N } from "./ToolLayout-CuKFTkh4.js";
import { C as D } from "./copy-BogRq2Ao.js";
import { R as C } from "./rotate-ccw-CkjmwfZV.js";
import { A as R } from "./alert-circle-Dw9mwAgZ.js";
import "./tools-B3OPepIK.js";
import "./shield-BrCBnKXk.js";
var I = { exports: {} };
(function(X, A) {
  (function(w, O) {
    X.exports = O();
  })(globalThis, () => (() => {
    var k = { 949: (v, u, p) => {
      Object.defineProperty(u, "__esModule", { value: true }), u.CronParser = void 0;
      var o = p(515), g = function() {
        function m(t, e, r) {
          e === void 0 && (e = true), r === void 0 && (r = false), this.expression = t, this.dayOfWeekStartIndexZero = e, this.monthStartIndexZero = r;
        }
        return m.prototype.parse = function() {
          var t, e, r = (t = this.expression) !== null && t !== void 0 ? t : "";
          if (r === "@reboot") return e = ["@reboot", "", "", "", "", "", ""], e;
          if (r.startsWith("@")) {
            var n = this.parseSpecial(this.expression);
            e = this.extractParts(n);
          } else e = this.extractParts(this.expression);
          return this.normalize(e), this.validate(e), e;
        }, m.prototype.parseSpecial = function(t) {
          var e = { "@yearly": "0 0 1 1 *", "@annually": "0 0 1 1 *", "@monthly": "0 0 1 * *", "@weekly": "0 0 * * 0", "@daily": "0 0 * * *", "@midnight": "0 0 * * *", "@hourly": "0 * * * *", "@reboot": "@reboot" }, r = e[t];
          if (!r) throw new Error("Unknown special expression.");
          return r;
        }, m.prototype.extractParts = function(t) {
          if (!this.expression) throw new Error("cron expression is empty");
          for (var e = t.trim().split(/[ ]+/), r = 0; r < e.length; r++) if (e[r].includes(",")) {
            var n = e[r].split(",").map(function(a) {
              return a.trim();
            }).filter(function(a) {
              return a !== "";
            }).map(function(a) {
              return isNaN(Number(a)) ? a : Number(a);
            }).filter(function(a) {
              return a !== null && a !== "";
            });
            n.length === 0 && n.push("*"), n.sort(function(a, s) {
              return a !== null && s !== null ? a - s : 0;
            }), e[r] = n.map(function(a) {
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
          if (t[3] = t[3].replace("?", "*"), t[5] = t[5].replace("?", "*"), t[2] = t[2].replace("?", "*"), t[0].indexOf("0/") == 0 && (t[0] = t[0].replace("0/", "*/")), t[1].indexOf("0/") == 0 && (t[1] = t[1].replace("0/", "*/")), t[2].indexOf("0/") == 0 && (t[2] = t[2].replace("0/", "*/")), t[3].indexOf("1/") == 0 && (t[3] = t[3].replace("1/", "*/")), t[4].indexOf("1/") == 0 && (t[4] = t[4].replace("1/", "*/")), t[6].indexOf("1/") == 0 && (t[6] = t[6].replace("1/", "*/")), t[5] = t[5].replace(/(^\d)|([^#/\s]\d)/g, function(l) {
            var y = l.replace(/\D/, ""), d = y;
            return e.dayOfWeekStartIndexZero ? y == "7" && (d = "0") : d = (parseInt(y) - 1).toString(), l.replace(y, d);
          }), t[5] == "L" && (t[5] = "6"), t[3] == "?" && (t[3] = "*"), t[3].indexOf("W") > -1 && (t[3].indexOf(",") > -1 || t[3].indexOf("-") > -1)) throw new Error("The 'W' character can be specified only when the day-of-month is a single day, not a range or list of days.");
          var r = { SUN: 0, MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6 };
          for (var n in r) t[5] = t[5].replace(new RegExp(n, "gi"), r[n].toString());
          t[4] = t[4].replace(/(^\d{1,2})|([^#/\s]\d{1,2})/g, function(l) {
            var y = l.replace(/\D/, ""), d = y;
            return e.monthStartIndexZero && (d = (parseInt(y) + 1).toString()), l.replace(y, d);
          });
          var i = { JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6, JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12 };
          for (var a in i) t[4] = t[4].replace(new RegExp(a, "gi"), i[a].toString());
          t[0] == "0" && (t[0] = ""), !/\*|\-|\,|\//.test(t[2]) && (/\*|\//.test(t[1]) || /\*|\//.test(t[0])) && (t[2] += "-".concat(t[2]));
          for (var s = 0; s < t.length; s++) if (t[s].indexOf(",") != -1 && (t[s] = t[s].split(",").filter(function(l) {
            return l !== "";
          }).join(",") || "*"), t[s] == "*/1" && (t[s] = "*"), t[s].indexOf("/") > -1 && !/^\*|\-|\,/.test(t[s])) {
            var c = null;
            switch (s) {
              case 4:
                c = "12";
                break;
              case 5:
                c = "6";
                break;
              case 6:
                c = "9999";
                break;
              default:
                c = null;
                break;
            }
            if (c !== null) {
              var f = t[s].split("/");
              t[s] = "".concat(f[0], "-").concat(c, "/").concat(f[1]);
            }
          }
        }, m.prototype.validate = function(t) {
          var e = "0-9,\\-*/";
          this.validateOnlyExpectedCharactersFound(t[0], e), this.validateOnlyExpectedCharactersFound(t[1], e), this.validateOnlyExpectedCharactersFound(t[2], e), this.validateOnlyExpectedCharactersFound(t[3], "0-9,\\-*/LW"), this.validateOnlyExpectedCharactersFound(t[4], e), this.validateOnlyExpectedCharactersFound(t[5], "0-9,\\-*/L#"), this.validateOnlyExpectedCharactersFound(t[6], e), this.validateAnyRanges(t);
        }, m.prototype.validateAnyRanges = function(t) {
          o.default.secondRange(t[0]), o.default.minuteRange(t[1]), o.default.hourRange(t[2]), o.default.dayOfMonthRange(t[3]), o.default.monthRange(t[4], this.monthStartIndexZero), o.default.dayOfWeekRange(t[5], this.dayOfWeekStartIndexZero);
        }, m.prototype.validateOnlyExpectedCharactersFound = function(t, e) {
          var r = t.match(new RegExp("[^".concat(e, "]+"), "gi"));
          if (r && r.length) throw new Error("Expression contains invalid values: '".concat(r.toString(), "'"));
        }, m;
      }();
      u.CronParser = g;
    }, 333: (v, u, p) => {
      Object.defineProperty(u, "__esModule", { value: true }), u.ExpressionDescriptor = void 0;
      var o = p(823), g = p(949), m = function() {
        function t(e, r) {
          if (this.expression = e, this.options = r, this.expressionParts = new Array(5), !this.options.locale && t.defaultLocale && (this.options.locale = t.defaultLocale), !t.locales[this.options.locale]) {
            var n = Object.keys(t.locales)[0];
            console.warn("Locale '".concat(this.options.locale, "' could not be found; falling back to '").concat(n, "'.")), this.options.locale = n;
          }
          this.i18n = t.locales[this.options.locale], r.use24HourTimeFormat === void 0 && (r.use24HourTimeFormat = this.i18n.use24HourTimeFormatByDefault());
        }
        return t.toString = function(e, r) {
          var n = r === void 0 ? {} : r, i = n.throwExceptionOnParseError, a = i === void 0 ? true : i, s = n.verbose, c = s === void 0 ? false : s, f = n.dayOfWeekStartIndexZero, l = f === void 0 ? true : f, y = n.monthStartIndexZero, d = y === void 0 ? false : y, b = n.use24HourTimeFormat, x = n.locale, j = x === void 0 ? null : x, T = n.logicalAndDayFields, M = T === void 0 ? false : T, S = { throwExceptionOnParseError: a, verbose: c, dayOfWeekStartIndexZero: l, monthStartIndexZero: d, use24HourTimeFormat: b, locale: j, logicalAndDayFields: M };
          S.tzOffset && console.warn("'tzOffset' option has been deprecated and is no longer supported.");
          var W = new t(e, S);
          return W.getFullDescription();
        }, t.initialize = function(e, r) {
          r === void 0 && (r = "en"), t.specialCharacters = ["/", "-", ",", "*"], t.defaultLocale = r, e.load(t.locales);
        }, t.prototype.getFullDescription = function() {
          var e, r, n = "";
          try {
            var i = new g.CronParser(this.expression, this.options.dayOfWeekStartIndexZero, this.options.monthStartIndexZero);
            if (this.expressionParts = i.parse(), this.expressionParts[0] === "@reboot") return ((r = (e = this.i18n).atReboot) === null || r === void 0 ? void 0 : r.call(e)) || "Run once, at startup";
            var a = this.getTimeOfDayDescription(), s = this.getDayOfMonthDescription(), c = this.getMonthDescription(), f = this.getDayOfWeekDescription(), l = this.getYearDescription();
            n += a + s + f + c + l, n = this.transformVerbosity(n, !!this.options.verbose), n = n.charAt(0).toLocaleUpperCase() + n.substr(1);
          } catch (y) {
            if (!this.options.throwExceptionOnParseError) n = this.i18n.anErrorOccuredWhenGeneratingTheExpressionD();
            else throw "".concat(y);
          }
          return n;
        }, t.prototype.getTimeOfDayDescription = function() {
          var e = this.expressionParts[0], r = this.expressionParts[1], n = this.expressionParts[2], i = "";
          if (!o.StringUtilities.containsAny(r, t.specialCharacters) && !o.StringUtilities.containsAny(n, t.specialCharacters) && !o.StringUtilities.containsAny(e, t.specialCharacters)) i += this.i18n.atSpace() + this.formatTime(n, r, e);
          else if (!e && r.indexOf("-") > -1 && !(r.indexOf(",") > -1) && !(r.indexOf("/") > -1) && !o.StringUtilities.containsAny(n, t.specialCharacters)) {
            var a = r.split("-");
            i += o.StringUtilities.format(this.i18n.everyMinuteBetweenX0AndX1(), this.formatTime(n, a[0], ""), this.formatTime(n, a[1], ""));
          } else if (!e && n.indexOf(",") > -1 && n.indexOf("-") == -1 && n.indexOf("/") == -1 && !o.StringUtilities.containsAny(r, t.specialCharacters)) {
            var s = n.split(",");
            i += this.i18n.at();
            for (var c = 0; c < s.length; c++) i += " ", i += this.formatTime(s[c], r, ""), c < s.length - 2 && (i += ","), c == s.length - 2 && (i += this.i18n.spaceAnd());
          } else {
            var f = this.getSecondsDescription(), l = this.getMinutesDescription(), y = this.getHoursDescription();
            if (i += f, i && l && (i += ", "), i += l, l === y) return i;
            i && y && (i += ", "), i += y;
          }
          return i;
        }, t.prototype.getSecondsDescription = function() {
          var e = this, r = this.getSegmentDescription(this.expressionParts[0], this.i18n.everySecond(), function(n) {
            return n;
          }, function(n) {
            return o.StringUtilities.format(e.i18n.everyX0Seconds(n), n);
          }, function(n) {
            return e.i18n.secondsX0ThroughX1PastTheMinute();
          }, function(n) {
            return n == "0" ? "" : parseInt(n) < 20 ? e.i18n.atX0SecondsPastTheMinute(n) : e.i18n.atX0SecondsPastTheMinuteGt20() || e.i18n.atX0SecondsPastTheMinute(n);
          });
          return r;
        }, t.prototype.getMinutesDescription = function() {
          var e = this, r = this.expressionParts[0], n = this.expressionParts[2], i = this.getSegmentDescription(this.expressionParts[1], this.i18n.everyMinute(), function(a) {
            return a;
          }, function(a) {
            return o.StringUtilities.format(e.i18n.everyX0Minutes(a), a);
          }, function(a) {
            return e.i18n.minutesX0ThroughX1PastTheHour();
          }, function(a) {
            try {
              return a == "0" && n.indexOf("/") == -1 && r == "" ? e.i18n.everyHour() : parseInt(a) < 20 ? e.i18n.atX0MinutesPastTheHour(a) : e.i18n.atX0MinutesPastTheHourGt20() || e.i18n.atX0MinutesPastTheHour(a);
            } catch {
              return e.i18n.atX0MinutesPastTheHour(a);
            }
          });
          return i;
        }, t.prototype.getHoursDescription = function() {
          var e = this, r = this.expressionParts[2], n = 0, i = [];
          r.split("/")[0].split(",").forEach(function(c) {
            var f = c.split("-");
            f.length === 2 && i.push({ value: f[1], index: n + 1 }), n += f.length;
          });
          var a = 0, s = this.getSegmentDescription(r, this.i18n.everyHour(), function(c) {
            var f = i.find(function(y) {
              return y.value === c && y.index === a;
            }), l = f && e.expressionParts[1] !== "0";
            return a++, l ? e.formatTime(c, "59", "") : e.formatTime(c, "0", "");
          }, function(c) {
            return o.StringUtilities.format(e.i18n.everyX0Hours(c), c);
          }, function(c) {
            return e.i18n.betweenX0AndX1();
          }, function(c) {
            return e.i18n.atX0();
          });
          return s;
        }, t.prototype.getDayOfWeekDescription = function() {
          var e = this, r = this.i18n.daysOfTheWeek(), n = null;
          return this.expressionParts[5] == "*" ? n = "" : n = this.getSegmentDescription(this.expressionParts[5], this.i18n.commaEveryDay(), function(i, a) {
            var s = i;
            i.indexOf("#") > -1 ? s = i.substring(0, i.indexOf("#")) : i.indexOf("L") > -1 && (s = s.replace("L", ""));
            var c = parseInt(s), f = e.i18n.daysOfTheWeekInCase ? e.i18n.daysOfTheWeekInCase(a)[c] : r[c];
            if (i.indexOf("#") > -1) {
              var l = null, y = i.substring(i.indexOf("#") + 1), d = i.substring(0, i.indexOf("#"));
              switch (y) {
                case "1":
                  l = e.i18n.first(d);
                  break;
                case "2":
                  l = e.i18n.second(d);
                  break;
                case "3":
                  l = e.i18n.third(d);
                  break;
                case "4":
                  l = e.i18n.fourth(d);
                  break;
                case "5":
                  l = e.i18n.fifth(d);
                  break;
              }
              f = l + " " + f;
            }
            return f;
          }, function(i) {
            return parseInt(i) == 1 ? "" : o.StringUtilities.format(e.i18n.commaEveryX0DaysOfTheWeek(i), i);
          }, function(i) {
            var a = i.substring(0, i.indexOf("-")), s = e.expressionParts[3] != "*";
            return s ? e.i18n.commaAndX0ThroughX1(a) : e.i18n.commaX0ThroughX1(a);
          }, function(i) {
            var a = null;
            if (i.indexOf("#") > -1) {
              var s = i.substring(i.indexOf("#") + 1), c = i.substring(0, i.indexOf("#"));
              a = e.i18n.commaOnThe(s, c).trim() + e.i18n.spaceX0OfTheMonth();
            } else if (i.indexOf("L") > -1) a = e.i18n.commaOnTheLastX0OfTheMonth(i.replace("L", ""));
            else {
              var f = e.expressionParts[3] != "*";
              f ? e.options.logicalAndDayFields ? a = e.i18n.commaOnlyOnX0(i) : a = e.i18n.commaAndOnX0() : a = e.i18n.commaOnlyOnX0(i);
            }
            return a;
          }), n;
        }, t.prototype.getMonthDescription = function() {
          var e = this, r = this.i18n.monthsOfTheYear(), n = this.getSegmentDescription(this.expressionParts[4], "", function(i, a) {
            return a && e.i18n.monthsOfTheYearInCase ? e.i18n.monthsOfTheYearInCase(a)[parseInt(i) - 1] : r[parseInt(i) - 1];
          }, function(i) {
            return parseInt(i) == 1 ? "" : o.StringUtilities.format(e.i18n.commaEveryX0Months(i), i);
          }, function(i) {
            return e.i18n.commaMonthX0ThroughMonthX1() || e.i18n.commaX0ThroughX1();
          }, function(i) {
            return e.i18n.commaOnlyInMonthX0 ? e.i18n.commaOnlyInMonthX0() : e.i18n.commaOnlyInX0();
          });
          return n;
        }, t.prototype.getDayOfMonthDescription = function() {
          var e = this, r = null, n = this.expressionParts[3];
          switch (n) {
            case "L":
              r = this.i18n.commaOnTheLastDayOfTheMonth();
              break;
            case "WL":
            case "LW":
              r = this.i18n.commaOnTheLastWeekdayOfTheMonth();
              break;
            default:
              var i = n.match(/(\d{1,2}W)|(W\d{1,2})/);
              if (i) {
                var a = parseInt(i[0].replace("W", "")), s = a == 1 ? this.i18n.firstWeekday() : o.StringUtilities.format(this.i18n.weekdayNearestDayX0(), a.toString());
                r = o.StringUtilities.format(this.i18n.commaOnTheX0OfTheMonth(), s);
                break;
              } else {
                var c = n.match(/L-(\d{1,2})/);
                if (c) {
                  var f = c[1];
                  r = o.StringUtilities.format(this.i18n.commaDaysBeforeTheLastDayOfTheMonth(f), f);
                  break;
                } else {
                  if (n == "*" && this.expressionParts[5] != "*") return "";
                  r = this.getSegmentDescription(n, this.i18n.commaEveryDay(), function(l) {
                    return l == "L" ? e.i18n.lastDay() : e.i18n.dayX0 ? o.StringUtilities.format(e.i18n.dayX0(), l) : l;
                  }, function(l) {
                    return l == "1" ? e.i18n.commaEveryDay() : e.i18n.commaEveryX0Days(l);
                  }, function(l) {
                    return e.i18n.commaBetweenDayX0AndX1OfTheMonth(l);
                  }, function(l) {
                    return e.i18n.commaOnDayX0OfTheMonth(l);
                  });
                }
                break;
              }
          }
          return r;
        }, t.prototype.getYearDescription = function() {
          var e = this, r = this.getSegmentDescription(this.expressionParts[6], "", function(n) {
            return /^\d+$/.test(n) ? new Date(parseInt(n), 1).getFullYear().toString() : n;
          }, function(n) {
            return o.StringUtilities.format(e.i18n.commaEveryX0Years(n), n);
          }, function(n) {
            return e.i18n.commaYearX0ThroughYearX1() || e.i18n.commaX0ThroughX1();
          }, function(n) {
            return e.i18n.commaOnlyInYearX0 ? e.i18n.commaOnlyInYearX0() : e.i18n.commaOnlyInX0();
          });
          return r;
        }, t.prototype.getSegmentDescription = function(e, r, n, i, a, s) {
          var c = null, f = e.indexOf("/") > -1, l = e.indexOf("-") > -1, y = e.indexOf(",") > -1;
          if (!e) c = "";
          else if (e === "*") c = r;
          else if (!f && !l && !y) c = o.StringUtilities.format(s(e), n(e));
          else if (y) {
            for (var d = e.split(","), b = "", x = 0; x < d.length; x++) if (x > 0 && d.length > 2 && (b += ",", x < d.length - 1 && (b += " ")), x > 0 && d.length > 1 && (x == d.length - 1 || d.length == 2) && (b += "".concat(this.i18n.spaceAnd(), " ")), d[x].indexOf("/") > -1 || d[x].indexOf("-") > -1) {
              var j = d[x].indexOf("-") > -1 && d[x].indexOf("/") == -1, T = this.getSegmentDescription(d[x], r, n, i, j ? this.i18n.commaX0ThroughX1 : a, s);
              j && (T = T.replace(", ", "")), b += T;
            } else f ? b += this.getSegmentDescription(d[x], r, n, i, a, s) : b += n(d[x]);
            f ? c = b : c = o.StringUtilities.format(s(e), b);
          } else if (f) {
            var d = e.split("/");
            if (c = o.StringUtilities.format(i(d[1]), d[1]), d[0].indexOf("-") > -1) {
              var M = this.generateRangeSegmentDescription(d[0], a, n);
              M.indexOf(", ") != 0 && (c += ", "), c += M;
            } else if (d[0].indexOf("*") == -1) {
              var S = o.StringUtilities.format(s(d[0]), n(d[0]));
              S = S.replace(", ", ""), c += o.StringUtilities.format(this.i18n.commaStartingX0(), S);
            }
          } else l && (c = this.generateRangeSegmentDescription(e, a, n));
          return c;
        }, t.prototype.generateRangeSegmentDescription = function(e, r, n) {
          var i = "", a = e.split("-"), s = n(a[0], 1), c = n(a[1], 2), f = r(e);
          return i += o.StringUtilities.format(f, s, c), i;
        }, t.prototype.formatTime = function(e, r, n) {
          var i = 0, a = 0, s = parseInt(e) + i, c = parseInt(r) + a;
          c >= 60 ? (c -= 60, s += 1) : c < 0 && (c += 60, s -= 1), s >= 24 ? s = s - 24 : s < 0 && (s = 24 + s);
          var f = "", l = false;
          this.options.use24HourTimeFormat || (l = !!(this.i18n.setPeriodBeforeTime && this.i18n.setPeriodBeforeTime()), f = l ? "".concat(this.getPeriod(s), " ") : " ".concat(this.getPeriod(s)), s > 12 && (s -= 12), s === 0 && (s = 12));
          var y = "";
          return n && (y = ":".concat(("00" + n).substring(n.length))), "".concat(l ? f : "").concat(("00" + s.toString()).substring(s.toString().length), ":").concat(("00" + c.toString()).substring(c.toString().length)).concat(y).concat(l ? "" : f);
        }, t.prototype.transformVerbosity = function(e, r) {
          if (!r && (e = e.replace(new RegExp(", ".concat(this.i18n.everyMinute()), "g"), ""), e = e.replace(new RegExp(", ".concat(this.i18n.everyHour()), "g"), ""), e = e.replace(new RegExp(this.i18n.commaEveryDay(), "g"), ""), e = e.replace(/\, ?$/, ""), this.i18n.conciseVerbosityReplacements)) for (var n = 0, i = Object.entries(this.i18n.conciseVerbosityReplacements()); n < i.length; n++) {
            var a = i[n], s = a[0], c = a[1];
            e = e.replace(new RegExp(s, "g"), c);
          }
          return e;
        }, t.prototype.getPeriod = function(e) {
          return e >= 12 ? this.i18n.pm && this.i18n.pm() || "PM" : this.i18n.am && this.i18n.am() || "AM";
        }, t.locales = {}, t;
      }();
      u.ExpressionDescriptor = m;
    }, 747: (v, u, p) => {
      Object.defineProperty(u, "__esModule", { value: true }), u.enLocaleLoader = void 0;
      var o = p(486), g = function() {
        function m() {
        }
        return m.prototype.load = function(t) {
          t.en = new o.en();
        }, m;
      }();
      u.enLocaleLoader = g;
    }, 486: (v, u) => {
      Object.defineProperty(u, "__esModule", { value: true }), u.en = void 0;
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
      u.en = p;
    }, 515: (v, u) => {
      Object.defineProperty(u, "__esModule", { value: true });
      function p(g, m) {
        if (!g) throw new Error(m);
      }
      var o = function() {
        function g() {
        }
        return g.secondRange = function(m) {
          for (var t = m.split(","), e = 0; e < t.length; e++) if (!isNaN(parseInt(t[e], 10))) {
            var r = parseInt(t[e], 10);
            p(r >= 0 && r <= 59, "seconds part must be >= 0 and <= 59");
          }
        }, g.minuteRange = function(m) {
          for (var t = m.split(","), e = 0; e < t.length; e++) if (!isNaN(parseInt(t[e], 10))) {
            var r = parseInt(t[e], 10);
            p(r >= 0 && r <= 59, "minutes part must be >= 0 and <= 59");
          }
        }, g.hourRange = function(m) {
          for (var t = m.split(","), e = 0; e < t.length; e++) if (!isNaN(parseInt(t[e], 10))) {
            var r = parseInt(t[e], 10);
            p(r >= 0 && r <= 23, "hours part must be >= 0 and <= 23");
          }
        }, g.dayOfMonthRange = function(m) {
          for (var t = m.split(","), e = 0; e < t.length; e++) if (!isNaN(parseInt(t[e], 10))) {
            var r = parseInt(t[e], 10);
            p(r >= 1 && r <= 31, "DOM part must be >= 1 and <= 31");
          }
        }, g.monthRange = function(m, t) {
          for (var e = m.split(","), r = 0; r < e.length; r++) if (!isNaN(parseInt(e[r], 10))) {
            var n = parseInt(e[r], 10);
            p(n >= 1 && n <= 12, t ? "month part must be >= 0 and <= 11" : "month part must be >= 1 and <= 12");
          }
        }, g.dayOfWeekRange = function(m, t) {
          for (var e = m.split(","), r = 0; r < e.length; r++) if (!isNaN(parseInt(e[r], 10))) {
            var n = parseInt(e[r], 10);
            p(n >= 0 && n <= 6, t ? "DOW part must be >= 0 and <= 6" : "DOW part must be >= 1 and <= 7");
          }
        }, g;
      }();
      u.default = o;
    }, 823: (v, u) => {
      Object.defineProperty(u, "__esModule", { value: true }), u.StringUtilities = void 0;
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
      u.StringUtilities = p;
    } }, w = {};
    function O(v) {
      var u = w[v];
      if (u !== void 0) return u.exports;
      var p = w[v] = { exports: {} };
      return k[v](p, p.exports, O), p.exports;
    }
    var E = {};
    return (() => {
      var v = E;
      Object.defineProperty(v, "__esModule", { value: true }), v.toString = void 0;
      var u = O(333), p = O(747);
      u.ExpressionDescriptor.initialize(new p.enLocaleLoader()), v.default = u.ExpressionDescriptor;
      var o = u.ExpressionDescriptor.toString;
      v.toString = o;
    })(), E;
  })());
})(I);
var H = I.exports;
const z = F(H), B = [{ title: "Five, Six And Seven Fields", desc: 'A Quartz expression with a leading seconds field reads correctly, and so does an EventBridge one ending in a year \u2014 0 18 ? * MON-FRI * comes back as "At 06:00 PM, Monday through Friday".' }, { title: "Rejects What It Cannot Read", desc: 'An unparseable field stops the translation rather than producing a silent guess: the green sentence disappears and a red "Invalid cron expression" line takes its place. Jenkins hashed syntax such as H/15 * * * * is rejected that way.' }, { title: "Fourteen Schedules To Start From", desc: "The buttons below the input cover the patterns people actually write \u2014 every five minutes, weekday mornings, midnight on the 1st and 15th, Friday evenings \u2014 as a starting point to edit." }], Y = [{ question: "Which field is which?", answer: "In the five-field form the order is minute (0-59), hour (0-23), day of month (1-31), month (1-12 or JAN-DEC) and day of week (0-6 or SUN-SAT, with 7 also accepted for Sunday). So 30 8 * * 1 is 08:30 every Monday. The two positions that trip people up are day of month and day of week sitting next to each other, and hour using a 24-hour clock while the description below reads back in 12-hour time." }, { question: 'Why does the description say "and" when both day fields are set?', answer: 'This is the single most dangerous corner of cron. Enter 0 0 13 * 5 and you are told "on day 13 of the month, and on Friday", but Vixie cron \u2014 the implementation behind crontab on Linux and macOS \u2014 treats those two fields as an OR whenever both are restricted. The job runs on every 13th and on every Friday, which in a typical year is around sixty runs rather than one or two. If you mean a single day, leave one of the two fields as an asterisk.' }, { question: "What do the special characters do?", answer: 'An asterisk means every value. A comma builds a list, as in 1,15. A hyphen builds a range, as in MON-FRI. A slash sets a step, so */5 in the minute field fires at 0, 5, 10 and so on, and 0-20/2 restricts the step to part of the range. Quartz adds a question mark for "no specific value" in one of the day fields, L for last, and # for the nth weekday \u2014 0 0 * * MON#2 is the second Monday of each month.' }, { question: "Does it check that the date actually exists?", answer: 'No. The parser describes the fields it is given without asking whether any calendar date satisfies them. Enter 0 0 30 2 * and you are told "At 12:00 AM, on day 30 of the month, only in February" \u2014 a date that never arrives, so the job never fires. February the 29th behaves similarly and only runs in leap years. If a scheduled task has mysteriously never executed, an impossible day-of-month value is worth ruling out first.' }, { question: "Which timezone does the schedule use?", answer: "Whichever the runner uses, and this page cannot know that \u2014 a cron expression carries no zone of its own. System crontab follows the machine's local time and honours CRON_TZ or TZ at the top of the file. GitHub Actions, AWS EventBridge and most managed schedulers interpret expressions as UTC. Kubernetes CronJob defaults to the kube-controller-manager's zone unless timeZone is set. The practical hazard is daylight saving: on a local-time host, a 02:30 job can be skipped or run twice on changeover days." }, { question: "Will it tell me the next few run times?", answer: "No \u2014 this tool translates the expression into English and stops there. Predicting actual fire times means committing to a timezone, a DST policy and one platform's field ordering, and a wrong answer there would be worse than none. For a dry run, most schedulers can list upcoming executions themselves, and croniter or a cron library in your language will do it against a zone you choose." }], $ = () => {
  const [X, A] = _.useState("* * * * *"), [k, w] = _.useState(""), [O, E] = _.useState(null), v = (u) => {
    A(u);
    try {
      const p = z.toString(u);
      w(p), E(null);
    } catch {
      E("Invalid cron expression"), w("");
    }
  };
  return U.useEffect(() => {
    v(X);
  }, []), h.jsx(N, { title: "Cron Expression Parser", description: "Convert Cron expressions into human-readable descriptions.", seoTitle: "Cron Expression Parser - Online Cron to Text", seoDescription: "Free online Cron parser. Translate Cron expressions into plain English. Understand schedule syntax easily.", faqs: Y, children: h.jsxs("div", { className: "tool-workspace", style: { minHeight: "80vh", display: "flex", flexDirection: "column" }, children: [h.jsxs("div", { style: { background: "var(--card)", borderRadius: "1rem", border: "1px solid var(--border)", padding: "2rem", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)", maxWidth: "1000px", margin: "0 auto", width: "100%" }, children: [h.jsxs("div", { style: { marginBottom: "2rem" }, children: [h.jsx("label", { htmlFor: "cron-input", style: { display: "block", marginBottom: "0.5rem", fontWeight: "bold" }, children: "Cron Expression" }), h.jsxs("div", { style: { position: "relative", display: "flex", alignItems: "center" }, children: [h.jsx("input", { id: "cron-input", type: "text", value: X, onChange: (u) => v(u.target.value), placeholder: "* * * * *", className: "tool-input", style: { width: "100%", padding: "1rem", paddingRight: "6rem", borderRadius: "0.5rem", border: "1px solid var(--border)", fontSize: "1.2rem", fontFamily: "monospace" } }), h.jsxs("div", { style: { position: "absolute", right: "0.5rem", display: "flex", gap: "0.5rem" }, children: [h.jsx("button", { className: "tool-action-btn-sm", onClick: () => {
    navigator.clipboard.writeText(X);
  }, title: "Copy", style: { padding: "0.5rem", background: "transparent", border: "none", cursor: "pointer", color: "#64748b" }, children: h.jsx(D, { size: 20 }) }), h.jsx("button", { className: "tool-action-btn-sm", onClick: () => v("* * * * *"), title: "Reset", style: { padding: "0.5rem", background: "transparent", border: "none", cursor: "pointer", color: "#64748b" }, children: h.jsx(C, { size: 20 }) })] })] }), h.jsx("div", { style: { marginTop: "0.5rem", fontSize: "0.9rem", color: "#64748b" }, children: "Format: Minute Hour Day Month Weekday" })] }), O && h.jsxs("div", { id: "cron-error", style: { color: "#ef4444", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }, children: [h.jsx(R, { size: 18 }), " ", O] }), k && !O && h.jsxs("div", { id: "cron-result", style: { padding: "1.5rem", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "0.5rem", color: "#166534", fontSize: "1.2rem", fontWeight: "bold", textAlign: "center" }, children: ['"', k, '"'] }), h.jsx("div", { style: { marginTop: "2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: "0.75rem" }, children: ["*/5 * * * *", "0 0 * * *", "0 12 * * MON", "0 0 1 1 *", "0 9 * * 1-5", "*/15 * * * *", "0 0 1 * *", "0 23 * * 5", "30 8 * * *", "0 0 1,15 * *", "*/10 * * * 1-5", "0 0 * * 0", "0 8 1 * *", "0 22 * * 1-5"].map((u, p) => h.jsx("button", { id: `cron-example-btn-${p}`, onClick: () => v(u), className: "tool-example-btn", style: { padding: "0.5rem", border: "1px solid var(--border)", background: "white", borderRadius: "0.25rem", cursor: "pointer", fontSize: "0.9rem" }, children: u }, u)) })] }), h.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [h.jsx(L, {}), h.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [h.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Cron Expression Parser" }), h.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "A cron expression packs a repeating schedule into a handful of space-separated fields. It is compact and it is unforgiving: a schedule that fires sixty times more often than intended looks almost identical to the one you meant. Type an expression above and it is translated into a sentence as you type, so the mistake surfaces before the job does." }), h.jsx("h3", { style: { fontSize: "1.15rem", fontWeight: "600", margin: "1.75rem 0 0.75rem" }, children: "Reading the translation critically" }), h.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: `The description is generated from the fields alone, so it reflects your intent rather than your scheduler's behaviour. Two gaps are worth holding in mind. When both the day-of-month and day-of-week fields are restricted, the sentence joins them with "and" while classic cron treats them as an alternative and runs on either. And nothing checks the calendar, so a February the 30th schedule is described as cheerfully as any other.` }), h.jsx("h3", { style: { fontSize: "1.15rem", fontWeight: "600", margin: "1.75rem 0 0.75rem" }, children: "Field counts differ by platform" }), h.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["Five fields is the Unix crontab standard, and it is what Kubernetes CronJob and GitHub Actions expect. Quartz and Spring add a seconds field at the front, making six. AWS EventBridge also uses six, but its extra field is a year at the end and it requires a question mark in one of the two day fields. Both shapes are handled here, along with the seven-field Quartz form, so ", h.jsx("code", { children: "0 0 12 * * ?" }), " reads as noon and ", h.jsx("code", { children: "0 15 10 ? * 6L 2025" }), " as the last Saturday of each month in 2025."] }), h.jsx("h3", { style: { fontSize: "1.15rem", fontWeight: "600", margin: "1.75rem 0 0.75rem" }, children: "Shorthand, and what is not accepted" }), h.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["The ", h.jsx("code", { children: "@hourly" }), ", ", h.jsx("code", { children: "@daily" }), ", ", h.jsx("code", { children: "@weekly" }), ", ", h.jsx("code", { children: "@monthly" }), ", ", h.jsx("code", { children: "@yearly" }), " and ", h.jsx("code", { children: "@reboot" }), " macros are understood \u2014 the last describes itself as running once at startup, a useful reminder that it is tied to boot rather than to a clock. Jenkins' hashed syntax is not supported: an ", h.jsx("code", { children: "H" }), " asks Jenkins to spread the job across the hour, which is a load-balancing instruction rather than a time, and an expression containing one is simply reported here as ", h.jsx("em", { children: "Invalid cron expression" }), ". The error line is the same for every failure \u2014 it names no field and no position \u2014 so when it appears, clear fields back to asterisks one at a time to find the one at fault."] }), h.jsx("h3", { style: { fontSize: "1.15rem", fontWeight: "600", margin: "1.75rem 0 0.75rem" }, children: "Habits that prevent incidents" }), h.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: ["Avoid the top of the hour for anything heavy \u2014 ", h.jsx("code", { children: "0 * * * *" }), " means every host in the fleet starts at the same instant, and offsetting to ", h.jsx("code", { children: "7 * * * *" }), " costs nothing. Assume overlapping runs are possible and take a lock, because cron starts the next instance whether or not the previous one has finished. Everything on this page is worked out in the tab with no expression stored or sent anywhere, so it is safe to paste a line straight out of a production crontab while you check it."] })] }), h.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: B.map((u, p) => h.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [h.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: p === 0 ? h.jsx(C, { color: "var(--primary)", size: 24 }) : p === 1 ? h.jsx(R, { color: "var(--primary)", size: 24 }) : h.jsx(D, { color: "var(--primary)", size: 24 }) }), h.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: u.title }), h.jsx("p", { style: { color: "var(--text-secondary)" }, children: u.desc })] }, p)) })] })] }) });
};
export {
  $ as default
};
