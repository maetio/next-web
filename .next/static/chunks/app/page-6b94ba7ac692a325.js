(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [931],
  {
    314: function (e, t, n) {
      Promise.resolve().then(n.t.bind(n, 8707, 23)),
        Promise.resolve().then(n.t.bind(n, 7533, 23));
    },
    8707: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "default", {
          enumerable: !0,
          get: function () {
            return b;
          },
        });
      let r = n(6927),
        i = n(5909),
        o = i._(n(6006)),
        a = r._(n(9209)),
        l = n(3930),
        u = n(8706),
        s = n(3278);
      n(4745);
      let d = r._(n(8685)),
        c = {
          deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
          imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
          path: "/_next/image",
          loader: "default",
          dangerouslyAllowSVG: !1,
          unoptimized: !1,
        };
      function f(e) {
        return void 0 !== e.default;
      }
      function p(e) {
        return void 0 === e
          ? e
          : "number" == typeof e
          ? Number.isFinite(e)
            ? e
            : NaN
          : "string" == typeof e && /^[0-9]+$/.test(e)
          ? parseInt(e, 10)
          : NaN;
      }
      function g(e, t, n, r, i, o, a) {
        if (!e || e["data-loaded-src"] === t) return;
        e["data-loaded-src"] = t;
        let l = "decode" in e ? e.decode() : Promise.resolve();
        l.catch(() => {}).then(() => {
          if (e.parentElement && e.isConnected) {
            if (("blur" === n && o(!0), null == r ? void 0 : r.current)) {
              let t = new Event("load");
              Object.defineProperty(t, "target", { writable: !1, value: e });
              let n = !1,
                i = !1;
              r.current({
                ...t,
                nativeEvent: t,
                currentTarget: e,
                target: e,
                isDefaultPrevented: () => n,
                isPropagationStopped: () => i,
                persist: () => {},
                preventDefault: () => {
                  (n = !0), t.preventDefault();
                },
                stopPropagation: () => {
                  (i = !0), t.stopPropagation();
                },
              });
            }
            (null == i ? void 0 : i.current) && i.current(e);
          }
        });
      }
      function m(e) {
        let [t, n] = o.version.split("."),
          r = parseInt(t, 10),
          i = parseInt(n, 10);
        return r > 18 || (18 === r && i >= 3)
          ? { fetchPriority: e }
          : { fetchpriority: e };
      }
      let h = (0, o.forwardRef)((e, t) => {
          let {
            imgAttributes: n,
            heightInt: r,
            widthInt: i,
            qualityInt: a,
            className: l,
            imgStyle: u,
            blurStyle: s,
            isLazy: d,
            fetchPriority: c,
            fill: f,
            placeholder: p,
            loading: h,
            srcString: _,
            config: b,
            unoptimized: y,
            loader: v,
            onLoadRef: w,
            onLoadingCompleteRef: j,
            setBlurComplete: S,
            setShowAltText: C,
            onLoad: P,
            onError: E,
            ...O
          } = e;
          return (
            (h = d ? "lazy" : h),
            o.default.createElement("img", {
              ...O,
              ...m(c),
              loading: h,
              width: i,
              height: r,
              decoding: "async",
              "data-nimg": f ? "fill" : "1",
              className: l,
              style: { ...u, ...s },
              ...n,
              ref: (0, o.useCallback)(
                (e) => {
                  t &&
                    ("function" == typeof t
                      ? t(e)
                      : "object" == typeof t && (t.current = e)),
                    e &&
                      (E && (e.src = e.src),
                      e.complete && g(e, _, p, w, j, S, y));
                },
                [_, p, w, j, S, E, y, t]
              ),
              onLoad: (e) => {
                let t = e.currentTarget;
                g(t, _, p, w, j, S, y);
              },
              onError: (e) => {
                C(!0), "blur" === p && S(!0), E && E(e);
              },
            })
          );
        }),
        _ = (0, o.forwardRef)((e, t) => {
          var n;
          let r,
            i,
            {
              src: g,
              sizes: _,
              unoptimized: b = !1,
              priority: y = !1,
              loading: v,
              className: w,
              quality: j,
              width: S,
              height: C,
              fill: P,
              style: E,
              onLoad: O,
              onLoadingComplete: x,
              placeholder: M = "empty",
              blurDataURL: k,
              fetchPriority: I,
              layout: z,
              objectFit: A,
              objectPosition: R,
              lazyBoundary: D,
              lazyRoot: U,
              ...N
            } = e,
            F = (0, o.useContext)(s.ImageConfigContext),
            W = (0, o.useMemo)(() => {
              let e = c || F || u.imageConfigDefault,
                t = [...e.deviceSizes, ...e.imageSizes].sort((e, t) => e - t),
                n = e.deviceSizes.sort((e, t) => e - t);
              return { ...e, allSizes: t, deviceSizes: n };
            }, [F]),
            L = N.loader || d.default;
          delete N.loader;
          let T = "__next_img_default" in L;
          if (T) {
            if ("custom" === W.loader)
              throw Error(
                'Image with src "' +
                  g +
                  '" is missing "loader" prop.\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader'
              );
          } else {
            let e = L;
            L = (t) => {
              let { config: n, ...r } = t;
              return e(r);
            };
          }
          if (z) {
            "fill" === z && (P = !0);
            let e = {
              intrinsic: { maxWidth: "100%", height: "auto" },
              responsive: { width: "100%", height: "auto" },
            }[z];
            e && (E = { ...E, ...e });
            let t = { responsive: "100vw", fill: "100vw" }[z];
            t && !_ && (_ = t);
          }
          let B = "",
            G = p(S),
            q = p(C);
          if ("object" == typeof (n = g) && (f(n) || void 0 !== n.src)) {
            let e = f(g) ? g.default : g;
            if (!e.src)
              throw Error(
                "An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received " +
                  JSON.stringify(e)
              );
            if (!e.height || !e.width)
              throw Error(
                "An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received " +
                  JSON.stringify(e)
              );
            if (
              ((r = e.blurWidth),
              (i = e.blurHeight),
              (k = k || e.blurDataURL),
              (B = e.src),
              !P)
            ) {
              if (G || q) {
                if (G && !q) {
                  let t = G / e.width;
                  q = Math.round(e.height * t);
                } else if (!G && q) {
                  let t = q / e.height;
                  G = Math.round(e.width * t);
                }
              } else (G = e.width), (q = e.height);
            }
          }
          let H = !y && ("lazy" === v || void 0 === v);
          (!(g = "string" == typeof g ? g : B) ||
            g.startsWith("data:") ||
            g.startsWith("blob:")) &&
            ((b = !0), (H = !1)),
            W.unoptimized && (b = !0),
            T && g.endsWith(".svg") && !W.dangerouslyAllowSVG && (b = !0),
            y && (I = "high");
          let [V, J] = (0, o.useState)(!1),
            [Y, $] = (0, o.useState)(!1),
            K = p(j),
            Q = Object.assign(
              P
                ? {
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    objectFit: A,
                    objectPosition: R,
                  }
                : {},
              Y ? {} : { color: "transparent" },
              E
            ),
            X =
              "blur" === M && k && !V
                ? {
                    backgroundSize: Q.objectFit || "cover",
                    backgroundPosition: Q.objectPosition || "50% 50%",
                    backgroundRepeat: "no-repeat",
                    backgroundImage:
                      'url("data:image/svg+xml;charset=utf-8,' +
                      (0, l.getImageBlurSvg)({
                        widthInt: G,
                        heightInt: q,
                        blurWidth: r,
                        blurHeight: i,
                        blurDataURL: k,
                        objectFit: Q.objectFit,
                      }) +
                      '")',
                  }
                : {},
            Z = (function (e) {
              let {
                config: t,
                src: n,
                unoptimized: r,
                width: i,
                quality: o,
                sizes: a,
                loader: l,
              } = e;
              if (r) return { src: n, srcSet: void 0, sizes: void 0 };
              let { widths: u, kind: s } = (function (e, t, n) {
                  let { deviceSizes: r, allSizes: i } = e;
                  if (n) {
                    let e = /(^|\s)(1?\d?\d)vw/g,
                      t = [];
                    for (let r; (r = e.exec(n)); r) t.push(parseInt(r[2]));
                    if (t.length) {
                      let e = 0.01 * Math.min(...t);
                      return {
                        widths: i.filter((t) => t >= r[0] * e),
                        kind: "w",
                      };
                    }
                    return { widths: i, kind: "w" };
                  }
                  if ("number" != typeof t) return { widths: r, kind: "w" };
                  let o = [
                    ...new Set(
                      [t, 2 * t].map(
                        (e) => i.find((t) => t >= e) || i[i.length - 1]
                      )
                    ),
                  ];
                  return { widths: o, kind: "x" };
                })(t, i, a),
                d = u.length - 1;
              return {
                sizes: a || "w" !== s ? a : "100vw",
                srcSet: u
                  .map(
                    (e, r) =>
                      l({ config: t, src: n, quality: o, width: e }) +
                      " " +
                      ("w" === s ? e : r + 1) +
                      s
                  )
                  .join(", "),
                src: l({ config: t, src: n, quality: o, width: u[d] }),
              };
            })({
              config: W,
              src: g,
              unoptimized: b,
              width: G,
              quality: K,
              sizes: _,
              loader: L,
            }),
            ee = g,
            et = (0, o.useRef)(O);
          (0, o.useEffect)(() => {
            et.current = O;
          }, [O]);
          let en = (0, o.useRef)(x);
          (0, o.useEffect)(() => {
            en.current = x;
          }, [x]);
          let er = {
            isLazy: H,
            imgAttributes: Z,
            heightInt: q,
            widthInt: G,
            qualityInt: K,
            className: w,
            imgStyle: Q,
            blurStyle: X,
            loading: v,
            config: W,
            fetchPriority: I,
            fill: P,
            unoptimized: b,
            placeholder: M,
            loader: L,
            srcString: ee,
            onLoadRef: et,
            onLoadingCompleteRef: en,
            setBlurComplete: J,
            setShowAltText: $,
            ...N,
          };
          return o.default.createElement(
            o.default.Fragment,
            null,
            o.default.createElement(h, { ...er, ref: t }),
            y
              ? o.default.createElement(
                  a.default,
                  null,
                  o.default.createElement("link", {
                    key: "__nimg-" + Z.src + Z.srcSet + Z.sizes,
                    rel: "preload",
                    as: "image",
                    href: Z.srcSet ? void 0 : Z.src,
                    imageSrcSet: Z.srcSet,
                    imageSizes: Z.sizes,
                    crossOrigin: N.crossOrigin,
                    referrerPolicy: N.referrerPolicy,
                    ...m(I),
                  })
                )
              : null
          );
        }),
        b = _;
      ("function" == typeof t.default ||
        ("object" == typeof t.default && null !== t.default)) &&
        void 0 === t.default.__esModule &&
        (Object.defineProperty(t.default, "__esModule", { value: !0 }),
        Object.assign(t.default, t),
        (e.exports = t.default));
    },
    1909: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "AmpStateContext", {
          enumerable: !0,
          get: function () {
            return o;
          },
        });
      let r = n(6927),
        i = r._(n(6006)),
        o = i.default.createContext({});
    },
    7060: function (e, t) {
      "use strict";
      function n(e) {
        let {
          ampFirst: t = !1,
          hybrid: n = !1,
          hasQuery: r = !1,
        } = void 0 === e ? {} : e;
        return t || (n && r);
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "isInAmpMode", {
          enumerable: !0,
          get: function () {
            return n;
          },
        });
    },
    9209: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (function (e, t) {
          for (var n in t)
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        })(t, {
          defaultHead: function () {
            return d;
          },
          default: function () {
            return g;
          },
        });
      let r = n(6927),
        i = n(5909),
        o = i._(n(6006)),
        a = r._(n(9797)),
        l = n(1909),
        u = n(5415),
        s = n(7060);
      function d(e) {
        void 0 === e && (e = !1);
        let t = [o.default.createElement("meta", { charSet: "utf-8" })];
        return (
          e ||
            t.push(
              o.default.createElement("meta", {
                name: "viewport",
                content: "width=device-width",
              })
            ),
          t
        );
      }
      function c(e, t) {
        return "string" == typeof t || "number" == typeof t
          ? e
          : t.type === o.default.Fragment
          ? e.concat(
              o.default.Children.toArray(t.props.children).reduce(
                (e, t) =>
                  "string" == typeof t || "number" == typeof t
                    ? e
                    : e.concat(t),
                []
              )
            )
          : e.concat(t);
      }
      n(4745);
      let f = ["name", "httpEquiv", "charSet", "itemProp"];
      function p(e, t) {
        let { inAmpMode: n } = t;
        return e
          .reduce(c, [])
          .reverse()
          .concat(d(n).reverse())
          .filter(
            (function () {
              let e = new Set(),
                t = new Set(),
                n = new Set(),
                r = {};
              return (i) => {
                let o = !0,
                  a = !1;
                if (
                  i.key &&
                  "number" != typeof i.key &&
                  i.key.indexOf("$") > 0
                ) {
                  a = !0;
                  let t = i.key.slice(i.key.indexOf("$") + 1);
                  e.has(t) ? (o = !1) : e.add(t);
                }
                switch (i.type) {
                  case "title":
                  case "base":
                    t.has(i.type) ? (o = !1) : t.add(i.type);
                    break;
                  case "meta":
                    for (let e = 0, t = f.length; e < t; e++) {
                      let t = f[e];
                      if (i.props.hasOwnProperty(t)) {
                        if ("charSet" === t) n.has(t) ? (o = !1) : n.add(t);
                        else {
                          let e = i.props[t],
                            n = r[t] || new Set();
                          ("name" !== t || !a) && n.has(e)
                            ? (o = !1)
                            : (n.add(e), (r[t] = n));
                        }
                      }
                    }
                }
                return o;
              };
            })()
          )
          .reverse()
          .map((e, t) => {
            let r = e.key || t;
            if (
              !n &&
              "link" === e.type &&
              e.props.href &&
              [
                "https://fonts.googleapis.com/css",
                "https://use.typekit.net/",
              ].some((t) => e.props.href.startsWith(t))
            ) {
              let t = { ...(e.props || {}) };
              return (
                (t["data-href"] = t.href),
                (t.href = void 0),
                (t["data-optimized-fonts"] = !0),
                o.default.cloneElement(e, t)
              );
            }
            return o.default.cloneElement(e, { key: r });
          });
      }
      let g = function (e) {
        let { children: t } = e,
          n = (0, o.useContext)(l.AmpStateContext),
          r = (0, o.useContext)(u.HeadManagerContext);
        return o.default.createElement(
          a.default,
          {
            reduceComponentsToState: p,
            headManager: r,
            inAmpMode: (0, s.isInAmpMode)(n),
          },
          t
        );
      };
      ("function" == typeof t.default ||
        ("object" == typeof t.default && null !== t.default)) &&
        void 0 === t.default.__esModule &&
        (Object.defineProperty(t.default, "__esModule", { value: !0 }),
        Object.assign(t.default, t),
        (e.exports = t.default));
    },
    3930: function (e, t) {
      "use strict";
      function n(e) {
        let {
            widthInt: t,
            heightInt: n,
            blurWidth: r,
            blurHeight: i,
            blurDataURL: o,
            objectFit: a,
          } = e,
          l = r || t,
          u = i || n,
          s = o.startsWith("data:image/jpeg")
            ? "%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='1 1'/%3E%3C/feComponentTransfer%3E%"
            : "";
        return l && u
          ? "%3Csvg xmlns='http%3A//www.w3.org/2000/svg' viewBox='0 0 " +
              l +
              " " +
              u +
              "'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='" +
              (r && i ? "1" : "20") +
              "'/%3E" +
              s +
              "%3C/filter%3E%3Cimage preserveAspectRatio='none' filter='url(%23b)' x='0' y='0' height='100%25' width='100%25' href='" +
              o +
              "'/%3E%3C/svg%3E"
          : "%3Csvg xmlns='http%3A//www.w3.org/2000/svg'%3E%3Cimage style='filter:blur(20px)' preserveAspectRatio='" +
              ("contain" === a
                ? "xMidYMid"
                : "cover" === a
                ? "xMidYMid slice"
                : "none") +
              "' x='0' y='0' height='100%25' width='100%25' href='" +
              o +
              "'/%3E%3C/svg%3E";
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "getImageBlurSvg", {
          enumerable: !0,
          get: function () {
            return n;
          },
        });
    },
    3278: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "ImageConfigContext", {
          enumerable: !0,
          get: function () {
            return a;
          },
        });
      let r = n(6927),
        i = r._(n(6006)),
        o = n(8706),
        a = i.default.createContext(o.imageConfigDefault);
    },
    8706: function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (function (e, t) {
          for (var n in t)
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        })(t, {
          VALID_LOADERS: function () {
            return n;
          },
          imageConfigDefault: function () {
            return r;
          },
        });
      let n = ["default", "imgix", "cloudinary", "akamai", "custom"],
        r = {
          deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
          imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
          path: "/_next/image",
          loader: "default",
          loaderFile: "",
          domains: [],
          disableStaticImages: !1,
          minimumCacheTTL: 60,
          formats: ["image/webp"],
          dangerouslyAllowSVG: !1,
          contentSecurityPolicy:
            "script-src 'none'; frame-src 'none'; sandbox;",
          contentDispositionType: "inline",
          remotePatterns: [],
          unoptimized: !1,
        };
    },
    8685: function (e, t) {
      "use strict";
      function n(e) {
        let { config: t, src: n, width: r, quality: i } = e;
        return (
          t.path +
          "?url=" +
          encodeURIComponent(n) +
          "&w=" +
          r +
          "&q=" +
          (i || 75)
        );
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "default", {
          enumerable: !0,
          get: function () {
            return r;
          },
        }),
        (n.__next_img_default = !0);
      let r = n;
    },
    9797: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "default", {
          enumerable: !0,
          get: function () {
            return l;
          },
        });
      let r = n(5909),
        i = r._(n(6006)),
        o = i.useLayoutEffect,
        a = i.useEffect;
      function l(e) {
        let { headManager: t, reduceComponentsToState: n } = e;
        function r() {
          if (t && t.mountedInstances) {
            let r = i.Children.toArray(
              Array.from(t.mountedInstances).filter(Boolean)
            );
            t.updateHead(n(r, e));
          }
        }
        return (
          o(() => {
            var n;
            return (
              null == t ||
                null == (n = t.mountedInstances) ||
                n.add(e.children),
              () => {
                var n;
                null == t ||
                  null == (n = t.mountedInstances) ||
                  n.delete(e.children);
              }
            );
          }),
          o(
            () => (
              t && (t._pendingUpdate = r),
              () => {
                t && (t._pendingUpdate = r);
              }
            )
          ),
          a(
            () => (
              t &&
                t._pendingUpdate &&
                (t._pendingUpdate(), (t._pendingUpdate = null)),
              () => {
                t &&
                  t._pendingUpdate &&
                  (t._pendingUpdate(), (t._pendingUpdate = null));
              }
            )
          ),
          null
        );
      }
    },
    4745: function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "warnOnce", {
          enumerable: !0,
          get: function () {
            return n;
          },
        });
      let n = (e) => {};
    },
    7533: function (e) {
      e.exports = {
        main: "page_main__ibFHK",
        description: "page_description__s_Lqk",
        code: "page_code__Cdcue",
        grid: "page_grid__2WZXq",
        card: "page_card__ftWzl",
        center: "page_center__GvJ9Y",
        logo: "page_logo__M5piD",
        content: "page_content__rFejU",
        vercelLogo: "page_vercelLogo__1QD2W",
        rotate: "page_rotate__P15uU",
      };
    },
  },
  function (e) {
    e.O(0, [667, 488, 744], function () {
      return e((e.s = 314));
    }),
      (_N_E = e.O());
  },
]);
