---
article_html: "<h1 id=\"traefik\">Traefik</h1>\n<p>If you don't know about <a href=\"https://doc.traefik.io/traefik/\">traefik</a>
  and you need a reverse-proxy then you might want to check it out.\nI used to use
  nginx for my reverse proxy but the config was over my head, and once it was working
  I was afraid to touch it.\nTraefik brings a lot to the table, my main uses are reverse
  proxy and ip whitelisting, but it's doing even more under the hood that I don't
  have a full-grasp of yet.</p>\n<p>I like Traefik a lot because once I get some basic
  config up it's incredibly easy to add services into my homelab whether they run
  on my primary server or not.\nThis will not be exhaustive but I'll outline my simple
  setup process of traefik and how I add services whether they are in docker or not.</p>\n<h1
  id=\"docker\">Docker</h1>\n<p>In 2022 I'm still a docker fan-boy and I run my traefik
  instance in a docker container. \nThis isn't necessary but I love the portability
  since my homelab is very dynamic at the moment.\nAnd even if it wasn't I'd still
  want to keep traefik in docker because deployment and updating are just so flipping
  easy</p>\n<p>A simple docker-compose file for traefik might look like this:</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"nt\">name</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">traefik</span>\n<span
  class=\"nt\">image</span><span class=\"p\">:</span><span class=\"w\"> </span><span
  class=\"s\">&quot;traefik:v2.4&quot;</span>\n<span class=\"nt\">network_mode</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">host</span>\n<span
  class=\"nt\">volumes</span><span class=\"p\">:</span>\n<span class=\"w\">  </span><span
  class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;docker-data/traefik/traefik.toml:/etc/traefik/traefik.toml:ro&quot;</span>\n<span
  class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span
  class=\"s\">&quot;docker-data/traefik/config.yml:/etc/traefik/config.yml:ro&quot;</span>\n<span
  class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span
  class=\"s\">&quot;docker-data/traefik/letsencrypt:/letsencrypt:rw&quot;</span>\n<span
  class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span
  class=\"s\">&quot;/var/run/docker.sock:/var/run/docker.sock:ro&quot;</span><span
  class=\"w\">  </span><span class=\"c1\"># for auto-discovery</span>\n<span class=\"nt\">env</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;&quot;</span>\n<span
  class=\"nt\">restart_policy</span><span class=\"p\">:</span><span class=\"w\"> </span><span
  class=\"l l-Scalar l-Scalar-Plain\">unless-stopped</span>\n<span class=\"nt\">memory</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;1g&quot;</span>\n</code></pre></div>\n<h1
  id=\"ansible-deployment\">Ansible deployment</h1>\n<p><strong>I plan to have more
  on my homelab and Ansible on this site eventually...</strong></p>\n<p>I use Ansible
  to deploy most of my services at home, including traefik. My main homelab repo is
  <a href=\"https://github.com/nicpayne713/ansible-nas\">here</a> which is a fork
  of <a href=\"https://github.com/davestephens/ansible-nas\">Ansible NAS</a>.</p>\n<blockquote>\n<p>If
  you want my stuff then be sure to go to the <code>user/nic</code> branch on my fork</p>\n</blockquote>\n<p>You
  can see the ansible stuff for traefik <a href=\"https://github.com/davestephens/ansible-nas/tree/master/roles/traefik\">here</a></p>\n<h1
  id=\"config\">Config</h1>\n<p>I use a <code>traefik.toml</code> as the main config
  and it looks something like this.\nWith ansible a lot of this is done through template
  variables but this is the general idea.\nThis config tells traefik what ports to
  listen and forward on, and gives the names to be referenced by docker labels (down
  below). </p>\n<p>Traefik also has a handy web ui that with this config you can find
  on port <code>8080</code>.\nThere is a <code>providers</code> section - which is
  one of the biggest selling points of traefik for me.\nI have a docker provider configured
  \ and a static file. </p>\n<p>The docker provider lets traefik auto-discover new
  services that I deploy and automatically handle the routing!\nThe static file lets
  me easily add non-dockerized service routing, or routing to dockerized services
  on another host (I think traefik has an easier way to do this automatically but
  I don't do it often enough to need that kind of automation).\nThen at the bottom
  is the SSL cert stuff. \nUsing Let's Encrypt is pretty easy and I use Cloudflare
  as my DNS provider</p>\n<div class=\"highlight\"><pre><span></span><code><span class=\"k\">[entryPoints]</span>\n<span
  class=\"k\">[entryPoints.web]</span>\n<span class=\"n\">address</span><span class=\"w\">
  </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;:80&quot;</span>\n\n<span
  class=\"k\">[entryPoints.web.http.redirections.entryPoint]</span>\n<span class=\"n\">to</span><span
  class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;websecure&quot;</span>\n\n<span
  class=\"k\">[entryPoints.websecure]</span>\n<span class=\"n\">address</span><span
  class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;:443&quot;</span>\n\n<span
  class=\"k\">[entryPoints.websecure.http.tls]</span>\n<span class=\"n\">certResolver</span><span
  class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;letsencrypt&quot;</span>\n\n<span
  class=\"k\">[entryPoints.websecure.http.tls.domains]</span>\n<span class=\"n\">main</span><span
  class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;example.com&quot;</span>\n<span
  class=\"n\">sans</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"p\">[</span>\n<span class=\"s2\">&quot;*.example.com&quot;</span>\n<span
  class=\"p\">]</span>\n\n<span class=\"k\">[entryPoints.traefik]</span>\n<span class=\"n\">address</span><span
  class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;:8080&quot;</span>\n\n<span
  class=\"k\">[providers]</span>\n<span class=\"n\">providersThrottleDuration</span><span
  class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;1s&quot;</span>\n<span
  class=\"k\">[providers.docker]</span>\n<span class=\"n\">exposedbydefault</span><span
  class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"kc\">false</span>\n<span
  class=\"k\">[providers.file]</span>\n<span class=\"n\">filename</span><span class=\"w\">
  </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;/etc/traefik/config.yml&quot;</span>\n\n<span
  class=\"k\">[api]</span>\n<span class=\"n\">insecure</span><span class=\"w\"> </span><span
  class=\"o\">=</span><span class=\"w\"> </span><span class=\"kc\">true</span>\n<span
  class=\"n\">dashboard</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"kc\">true</span>\n\n<span class=\"k\">[log]</span>\n<span
  class=\"n\">level</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"s2\">&quot;INFO&quot;</span>\n\n<span class=\"k\">[ping]</span>\n<span
  class=\"n\">terminatingStatusCode</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"mi\">0</span>\n\n<span class=\"k\">[certificatesResolvers]</span>\n<span
  class=\"k\">[certificatesResolvers.letsencrypt]</span>\n<span class=\"k\">[certificatesResolvers.letsencrypt.acme]</span>\n<span
  class=\"n\">email</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"s2\">&quot;my_email@example.com&quot;</span>\n<span
  class=\"n\">storage</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"s2\">&quot;/letsencrypt/acme.json&quot;</span>\n<span
  class=\"n\">caserver</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"s2\">&quot;https://acme-staging-v02.api.letsencrypt.org/directory&quot;</span><span
  class=\"w\">  </span><span class=\"c1\"># le staging, not prod</span>\n\n<span class=\"k\">[certificatesResolvers.letsencrypt.acme.dnsChallenge]</span>\n<span
  class=\"n\">provider</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"s2\">&quot;cloudflare&quot;</span>\n</code></pre></div>\n<h1
  id=\"providersfile\">Providers.file</h1>\n<p>To my knowledge there isn't much to
  configure on the docker provider side of things until you deploy a service.\nBut
  the provider config file should get a little screen time here.</p>\n<p>The file
  defines a traefik http router for each service you define, in this case just <code>pihole</code>.
  </p>\n<p>Here I am adding my pihole instance which is not run inside docker but
  is inside a VM on another host.\nI want the <code>entryPoints</code> to be set to
  <code>websecure</code> which is configured above in the http redirects.\nI want
  some middlewares, <code>addprefix-pihole</code> and <code>default-headers</code>,
  which I'll explain below.\nI set letsencrypt as the cert certResolver.\nFinally
  I name the service <code>pihole</code>.</p>\n<p>Then in the <code>services</code>
  section I configure where pihole is located by just giving the internal IP for traefik
  to route to.\nFinally I define my middlewares. \nTo get to the pihole homepage you
  need to use the route <code>/admin</code> so I want that added automatically when
  I go to <code>pihole.example.com</code> so I come to <code>pihole.example.com/admin</code>.\nAnd
  I wanted to restrict access to just my internal network and my wireguard network
  - this is done with the <code>default-whitelist</code>. \nThe last thing is to configure
  a chain of middlewares that I called <code>secured</code> which is just easier for
  the docker labels later on.</p>\n<p>With this config in play though, traefik will
  know about the route <code>pihole.example.com</code> and handle the ip whitelisting
  and load balancing for me.</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"nt\">http</span><span class=\"p\">:</span>\n<span class=\"w\"> </span><span
  class=\"c1\">#region routers </span>\n<span class=\"w\">  </span><span class=\"nt\">routers</span><span
  class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"nt\">pihole</span><span
  class=\"p\">:</span>\n<span class=\"w\">      </span><span class=\"nt\">entryPoints</span><span
  class=\"p\">:</span>\n<span class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span
  class=\"w\"> </span><span class=\"s\">&quot;websecure&quot;</span>\n<span class=\"w\">
  \     </span><span class=\"nt\">rule</span><span class=\"p\">:</span><span class=\"w\">
  </span><span class=\"s\">&quot;Host(`pihole.example.com`)&quot;</span>\n<span class=\"w\">
  \     </span><span class=\"nt\">middlewares</span><span class=\"p\">:</span>\n<span
  class=\"w\">        </span><span class=\"c1\"># - default-headers</span>\n<span
  class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
  </span><span class=\"l l-Scalar l-Scalar-Plain\">addprefix-pihole</span>\n<span
  class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
  </span><span class=\"l l-Scalar l-Scalar-Plain\">default-whitelist</span>\n<span
  class=\"w\">      </span><span class=\"nt\">tls</span><span class=\"p\">:</span><span
  class=\"w\"> </span>\n<span class=\"w\">        </span><span class=\"nt\">certResolver</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">letsencrypt</span>\n<span
  class=\"w\">      </span><span class=\"nt\">service</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">pihole</span>\n<span
  class=\"w\">  </span><span class=\"c1\">#region services</span>\n<span class=\"w\">
  \ </span><span class=\"nt\">services</span><span class=\"p\">:</span>\n<span class=\"w\">
  \   </span><span class=\"nt\">pihole</span><span class=\"p\">:</span>\n<span class=\"w\">
  \     </span><span class=\"nt\">loadBalancer</span><span class=\"p\">:</span>\n<span
  class=\"w\">        </span><span class=\"nt\">servers</span><span class=\"p\">:</span>\n<span
  class=\"w\">          </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
  </span><span class=\"nt\">url</span><span class=\"p\">:</span><span class=\"w\">
  </span><span class=\"s\">&quot;http://192.168.1.3:80&quot;</span>\n<span class=\"w\">
  \       </span><span class=\"nt\">passHostHeader</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
  class=\"w\">  </span><span class=\"c1\">#endregion</span>\n<span class=\"w\">  </span><span
  class=\"nt\">middlewares</span><span class=\"p\">:</span>\n<span class=\"w\">    </span><span
  class=\"nt\">addprefix-pihole</span><span class=\"p\">:</span>\n<span class=\"w\">
  \     </span><span class=\"nt\">addPrefix</span><span class=\"p\">:</span>\n<span
  class=\"w\">        </span><span class=\"nt\">prefix</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"s\">&quot;/admin&quot;</span>\n<span class=\"w\">
  \   </span><span class=\"nt\">https-redirect</span><span class=\"p\">:</span>\n<span
  class=\"w\">      </span><span class=\"nt\">redirectScheme</span><span class=\"p\">:</span>\n<span
  class=\"w\">        </span><span class=\"nt\">scheme</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">https</span>\n\n<span
  class=\"w\">    </span><span class=\"nt\">default-headers</span><span class=\"p\">:</span>\n<span
  class=\"w\">      </span><span class=\"nt\">headers</span><span class=\"p\">:</span>\n<span
  class=\"w\">        </span><span class=\"nt\">frameDeny</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
  class=\"w\">        </span><span class=\"nt\">sslRedirect</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
  class=\"w\">        </span><span class=\"nt\">browserXssFilter</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
  class=\"w\">        </span><span class=\"nt\">contentTypeNosniff</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
  class=\"w\">        </span><span class=\"nt\">forceSTSHeader</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
  class=\"w\">        </span><span class=\"nt\">stsIncludeSubdomains</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
  class=\"w\">        </span><span class=\"nt\">stsPreload</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
  class=\"w\">        </span><span class=\"nt\">stsSeconds</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">15552000</span>\n<span
  class=\"w\">        </span><span class=\"nt\">customFrameOptionsValue</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">SAMEORIGIN</span>\n\n<span
  class=\"w\">    </span><span class=\"nt\">default-whitelist</span><span class=\"p\">:</span>\n<span
  class=\"w\">      </span><span class=\"nt\">ipWhiteList</span><span class=\"p\">:</span>\n<span
  class=\"w\">        </span><span class=\"nt\">sourceRange</span><span class=\"p\">:</span>\n<span
  class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
  </span><span class=\"s\">&quot;10.6.0.0/24&quot;</span><span class=\"w\">  </span><span
  class=\"c1\"># wg</span>\n<span class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span
  class=\"w\"> </span><span class=\"s\">&quot;192.168.1.0/24&quot;</span><span class=\"w\">
  \ </span><span class=\"c1\"># lan</span>\n<span class=\"w\">        </span><span
  class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;172.17.0.0/16&quot;</span><span
  class=\"w\">  </span><span class=\"c1\"># docker</span>\n\n<span class=\"w\">    </span><span
  class=\"nt\">secured</span><span class=\"p\">:</span>\n<span class=\"w\">      </span><span
  class=\"nt\">chain</span><span class=\"p\">:</span>\n<span class=\"w\">        </span><span
  class=\"nt\">middlewares</span><span class=\"p\">:</span>\n<span class=\"w\">        </span><span
  class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"l l-Scalar
  l-Scalar-Plain\">default-whitelist</span>\n<span class=\"w\">        </span><span
  class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"l l-Scalar
  l-Scalar-Plain\">default-headers</span>\n</code></pre></div>\n<h1 id=\"docker-labels\">Docker
  labels</h1>\n<p>Now the real magic is with Docker.\nHere is an example docker-compose
  file for spinning up a <a href=\"https://jellyfin.org/\">jellyfin</a> server that
  you want to expose to the world, or at least access at home with <code>jellyfin.example.com</code>
  instead of <code>http://192.168.1.N:8096</code>...</p>\n<p>I left some of the ansible
  variable stuff in here, but the main part to be concerned with is the <code>labels</code>
  section...</p>\n<p>We define just a few labels to throw onto this docker container
  which let's traefik discover it automatically and apply any settings necessary (like
  my <code>ipWhiteList</code>).</p>\n<ul>\n<li><code>traefik.enable</code> is either
  True or False. </li>\n<li><code>traefik.http.router.jellyfin.rule</code> defines
  an http router called jellyfin and sets the url to <code>jellyfin.example.com</code>
  (if example.com was my <code>ansible_nas_domain</code>)</li>\n<li><code>traefik.http.routers.jellyfin.tls.certresolver</code>
  is set to letsencrypt since I use LE for my wildcard certs.</li>\n<li><code>traefik.http.routers.jellyfin.tls.domains[0].main</code>
  will just be <code>example.com</code> -&gt; and this should remind you of the toml
  file above</li>\n<li><code>traefik.http.routers.jellyfin.tls.domains[0].sans</code>
  is set to <code>*.example.com</code></li>\n<li><code>traefik.http.services.jellyfin.loadbalancer.server.port</code>
  is set to jellyfin's default http port of 8096, which tells traefik which port to
  point to for this service.</li>\n</ul>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"nt\">name</span><span class=\"p\">:</span><span class=\"w\"> </span><span
  class=\"l l-Scalar l-Scalar-Plain\">jellyfin</span>\n<span class=\"nt\">image</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">linuxserver/jellyfin</span>\n<span
  class=\"nt\">volumes</span><span class=\"p\">:</span>\n<span class=\"w\">  </span><span
  class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;:/config:rw&quot;</span>\n<span
  class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span
  class=\"s\">&quot;:/movies:&quot;</span>\n<span class=\"w\">  </span><span class=\"p
  p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;:/music:&quot;</span>\n<span
  class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span
  class=\"s\">&quot;:/photos:&quot;</span>\n<span class=\"w\">  </span><span class=\"p
  p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;:/tv:&quot;</span>\n<span
  class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span
  class=\"s\">&quot;:/books:&quot;</span>\n<span class=\"w\">  </span><span class=\"p
  p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;:/audiobooks:&quot;</span>\n<span
  class=\"nt\">ports</span><span class=\"p\">:</span>\n<span class=\"w\">  </span><span
  class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;:8096&quot;</span>\n<span
  class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span
  class=\"s\">&quot;:8920&quot;</span>\n<span class=\"nt\">env</span><span class=\"p\">:</span>\n<span
  class=\"w\">  </span><span class=\"nt\">TZ</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"s\">&quot;&quot;</span>\n<span class=\"w\">  </span><span
  class=\"nt\">PUID</span><span class=\"p\">:</span><span class=\"w\"> </span><span
  class=\"s\">&quot;&quot;</span>\n<span class=\"w\">  </span><span class=\"nt\">PGID</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;&quot;</span>\n<span
  class=\"nt\">restart_policy</span><span class=\"p\">:</span><span class=\"w\"> </span><span
  class=\"l l-Scalar l-Scalar-Plain\">unless-stopped</span>\n<span class=\"nt\">memory</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">1g</span>\n<span
  class=\"nt\">labels</span><span class=\"p\">:</span>\n<span class=\"w\">  </span><span
  class=\"nt\">traefik.enable</span><span class=\"p\">:</span><span class=\"w\"> </span><span
  class=\"s\">&quot;&quot;</span>\n<span class=\"w\">  </span><span class=\"nt\">traefik.http.routers.jellyfin.rule</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;Host(`jellyfin.`)&quot;</span>\n<span
  class=\"w\">  </span><span class=\"nt\">traefik.http.routers.jellyfin.tls.certresolver</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;letsencrypt&quot;</span>\n<span
  class=\"w\">  </span><span class=\"l l-Scalar l-Scalar-Plain\">traefik.http.routers.jellyfin.tls.domains[0].main</span><span
  class=\"p p-Indicator\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;&quot;</span>\n<span
  class=\"w\">  </span><span class=\"l l-Scalar l-Scalar-Plain\">traefik.http.routers.jellyfin.tls.domains[0].sans</span><span
  class=\"p p-Indicator\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;*.&quot;</span>\n<span
  class=\"w\">  </span><span class=\"nt\">traefik.http.services.jellyfin.loadbalancer.server.port</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;8096&quot;</span>\n</code></pre></div>\n<p>And
  just like that traefik will automagically find your jellyfin container and route
  <code>jellyfin.example.com</code> to it!</p>\n<div class='prevnext'>\n\n    <style
  type='text/css'>\n\n    :root {\n      --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle:
  #83dcc8cc;\n      --prevnext-subtitle-brightness: 3;\n    }\n    [data-theme=\"light\"]
  {\n      --prevnext-color-text: #1f2022;\n      --prevnext-color-angle: #ffeb00;\n
  \     --prevnext-subtitle-brightness: 3;\n    }\n    [data-theme=\"dark\"] {\n      --prevnext-color-text:
  #d8ebe6;\n      --prevnext-color-angle: #83dcc8cc;\n      --prevnext-subtitle-brightness:
  3;\n    }\n    .prevnext {\n      display: flex;\n      flex-direction: row;\n      justify-content:
  space-around;\n      align-items: flex-start;\n    }\n    .prevnext a {\n      display:
  flex;\n      align-items: center;\n      width: 100%;\n      text-decoration: none;\n
  \   }\n    a.next {\n      justify-content: flex-end;\n    }\n    .prevnext a:hover
  {\n      background: #00000006;\n    }\n    .prevnext-subtitle {\n      color: var(--prevnext-color-text);\n
  \     filter: brightness(var(--prevnext-subtitle-brightness));\n      font-size:
  .8rem;\n    }\n    .prevnext-title {\n      color: var(--prevnext-color-text);\n
  \     font-size: 1rem;\n    }\n    .prevnext-text {\n      max-width: 30vw;\n    }\n
  \   </style>\n\n    <a class='prev' href='/dataframe-memory-usage'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Dataframe-Memory-Usage</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/tree'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Tree</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/traefik-01.png
date: 2022-03-06
datetime: 2022-03-06 00:00:00+00:00
description: 'If you don I like Traefik a lot because once I get some basic config
  up it In 2022 I A simple docker-compose file for traefik might look like this: I
  use Ansibl'
edit_link: https://github.com/edit/main/pages/blog/traefik-01.md
html: "<h1 id=\"traefik\">Traefik</h1>\n<p>If you don't know about <a href=\"https://doc.traefik.io/traefik/\">traefik</a>
  and you need a reverse-proxy then you might want to check it out.\nI used to use
  nginx for my reverse proxy but the config was over my head, and once it was working
  I was afraid to touch it.\nTraefik brings a lot to the table, my main uses are reverse
  proxy and ip whitelisting, but it's doing even more under the hood that I don't
  have a full-grasp of yet.</p>\n<p>I like Traefik a lot because once I get some basic
  config up it's incredibly easy to add services into my homelab whether they run
  on my primary server or not.\nThis will not be exhaustive but I'll outline my simple
  setup process of traefik and how I add services whether they are in docker or not.</p>\n<h1
  id=\"docker\">Docker</h1>\n<p>In 2022 I'm still a docker fan-boy and I run my traefik
  instance in a docker container. \nThis isn't necessary but I love the portability
  since my homelab is very dynamic at the moment.\nAnd even if it wasn't I'd still
  want to keep traefik in docker because deployment and updating are just so flipping
  easy</p>\n<p>A simple docker-compose file for traefik might look like this:</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"nt\">name</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">traefik</span>\n<span
  class=\"nt\">image</span><span class=\"p\">:</span><span class=\"w\"> </span><span
  class=\"s\">&quot;traefik:v2.4&quot;</span>\n<span class=\"nt\">network_mode</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">host</span>\n<span
  class=\"nt\">volumes</span><span class=\"p\">:</span>\n<span class=\"w\">  </span><span
  class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;docker-data/traefik/traefik.toml:/etc/traefik/traefik.toml:ro&quot;</span>\n<span
  class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span
  class=\"s\">&quot;docker-data/traefik/config.yml:/etc/traefik/config.yml:ro&quot;</span>\n<span
  class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span
  class=\"s\">&quot;docker-data/traefik/letsencrypt:/letsencrypt:rw&quot;</span>\n<span
  class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span
  class=\"s\">&quot;/var/run/docker.sock:/var/run/docker.sock:ro&quot;</span><span
  class=\"w\">  </span><span class=\"c1\"># for auto-discovery</span>\n<span class=\"nt\">env</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;&quot;</span>\n<span
  class=\"nt\">restart_policy</span><span class=\"p\">:</span><span class=\"w\"> </span><span
  class=\"l l-Scalar l-Scalar-Plain\">unless-stopped</span>\n<span class=\"nt\">memory</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;1g&quot;</span>\n</code></pre></div>\n<h1
  id=\"ansible-deployment\">Ansible deployment</h1>\n<p><strong>I plan to have more
  on my homelab and Ansible on this site eventually...</strong></p>\n<p>I use Ansible
  to deploy most of my services at home, including traefik. My main homelab repo is
  <a href=\"https://github.com/nicpayne713/ansible-nas\">here</a> which is a fork
  of <a href=\"https://github.com/davestephens/ansible-nas\">Ansible NAS</a>.</p>\n<blockquote>\n<p>If
  you want my stuff then be sure to go to the <code>user/nic</code> branch on my fork</p>\n</blockquote>\n<p>You
  can see the ansible stuff for traefik <a href=\"https://github.com/davestephens/ansible-nas/tree/master/roles/traefik\">here</a></p>\n<h1
  id=\"config\">Config</h1>\n<p>I use a <code>traefik.toml</code> as the main config
  and it looks something like this.\nWith ansible a lot of this is done through template
  variables but this is the general idea.\nThis config tells traefik what ports to
  listen and forward on, and gives the names to be referenced by docker labels (down
  below). </p>\n<p>Traefik also has a handy web ui that with this config you can find
  on port <code>8080</code>.\nThere is a <code>providers</code> section - which is
  one of the biggest selling points of traefik for me.\nI have a docker provider configured
  \ and a static file. </p>\n<p>The docker provider lets traefik auto-discover new
  services that I deploy and automatically handle the routing!\nThe static file lets
  me easily add non-dockerized service routing, or routing to dockerized services
  on another host (I think traefik has an easier way to do this automatically but
  I don't do it often enough to need that kind of automation).\nThen at the bottom
  is the SSL cert stuff. \nUsing Let's Encrypt is pretty easy and I use Cloudflare
  as my DNS provider</p>\n<div class=\"highlight\"><pre><span></span><code><span class=\"k\">[entryPoints]</span>\n<span
  class=\"k\">[entryPoints.web]</span>\n<span class=\"n\">address</span><span class=\"w\">
  </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;:80&quot;</span>\n\n<span
  class=\"k\">[entryPoints.web.http.redirections.entryPoint]</span>\n<span class=\"n\">to</span><span
  class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;websecure&quot;</span>\n\n<span
  class=\"k\">[entryPoints.websecure]</span>\n<span class=\"n\">address</span><span
  class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;:443&quot;</span>\n\n<span
  class=\"k\">[entryPoints.websecure.http.tls]</span>\n<span class=\"n\">certResolver</span><span
  class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;letsencrypt&quot;</span>\n\n<span
  class=\"k\">[entryPoints.websecure.http.tls.domains]</span>\n<span class=\"n\">main</span><span
  class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;example.com&quot;</span>\n<span
  class=\"n\">sans</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"p\">[</span>\n<span class=\"s2\">&quot;*.example.com&quot;</span>\n<span
  class=\"p\">]</span>\n\n<span class=\"k\">[entryPoints.traefik]</span>\n<span class=\"n\">address</span><span
  class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;:8080&quot;</span>\n\n<span
  class=\"k\">[providers]</span>\n<span class=\"n\">providersThrottleDuration</span><span
  class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;1s&quot;</span>\n<span
  class=\"k\">[providers.docker]</span>\n<span class=\"n\">exposedbydefault</span><span
  class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"kc\">false</span>\n<span
  class=\"k\">[providers.file]</span>\n<span class=\"n\">filename</span><span class=\"w\">
  </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;/etc/traefik/config.yml&quot;</span>\n\n<span
  class=\"k\">[api]</span>\n<span class=\"n\">insecure</span><span class=\"w\"> </span><span
  class=\"o\">=</span><span class=\"w\"> </span><span class=\"kc\">true</span>\n<span
  class=\"n\">dashboard</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"kc\">true</span>\n\n<span class=\"k\">[log]</span>\n<span
  class=\"n\">level</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"s2\">&quot;INFO&quot;</span>\n\n<span class=\"k\">[ping]</span>\n<span
  class=\"n\">terminatingStatusCode</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"mi\">0</span>\n\n<span class=\"k\">[certificatesResolvers]</span>\n<span
  class=\"k\">[certificatesResolvers.letsencrypt]</span>\n<span class=\"k\">[certificatesResolvers.letsencrypt.acme]</span>\n<span
  class=\"n\">email</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"s2\">&quot;my_email@example.com&quot;</span>\n<span
  class=\"n\">storage</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"s2\">&quot;/letsencrypt/acme.json&quot;</span>\n<span
  class=\"n\">caserver</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"s2\">&quot;https://acme-staging-v02.api.letsencrypt.org/directory&quot;</span><span
  class=\"w\">  </span><span class=\"c1\"># le staging, not prod</span>\n\n<span class=\"k\">[certificatesResolvers.letsencrypt.acme.dnsChallenge]</span>\n<span
  class=\"n\">provider</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"s2\">&quot;cloudflare&quot;</span>\n</code></pre></div>\n<h1
  id=\"providersfile\">Providers.file</h1>\n<p>To my knowledge there isn't much to
  configure on the docker provider side of things until you deploy a service.\nBut
  the provider config file should get a little screen time here.</p>\n<p>The file
  defines a traefik http router for each service you define, in this case just <code>pihole</code>.
  </p>\n<p>Here I am adding my pihole instance which is not run inside docker but
  is inside a VM on another host.\nI want the <code>entryPoints</code> to be set to
  <code>websecure</code> which is configured above in the http redirects.\nI want
  some middlewares, <code>addprefix-pihole</code> and <code>default-headers</code>,
  which I'll explain below.\nI set letsencrypt as the cert certResolver.\nFinally
  I name the service <code>pihole</code>.</p>\n<p>Then in the <code>services</code>
  section I configure where pihole is located by just giving the internal IP for traefik
  to route to.\nFinally I define my middlewares. \nTo get to the pihole homepage you
  need to use the route <code>/admin</code> so I want that added automatically when
  I go to <code>pihole.example.com</code> so I come to <code>pihole.example.com/admin</code>.\nAnd
  I wanted to restrict access to just my internal network and my wireguard network
  - this is done with the <code>default-whitelist</code>. \nThe last thing is to configure
  a chain of middlewares that I called <code>secured</code> which is just easier for
  the docker labels later on.</p>\n<p>With this config in play though, traefik will
  know about the route <code>pihole.example.com</code> and handle the ip whitelisting
  and load balancing for me.</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"nt\">http</span><span class=\"p\">:</span>\n<span class=\"w\"> </span><span
  class=\"c1\">#region routers </span>\n<span class=\"w\">  </span><span class=\"nt\">routers</span><span
  class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"nt\">pihole</span><span
  class=\"p\">:</span>\n<span class=\"w\">      </span><span class=\"nt\">entryPoints</span><span
  class=\"p\">:</span>\n<span class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span
  class=\"w\"> </span><span class=\"s\">&quot;websecure&quot;</span>\n<span class=\"w\">
  \     </span><span class=\"nt\">rule</span><span class=\"p\">:</span><span class=\"w\">
  </span><span class=\"s\">&quot;Host(`pihole.example.com`)&quot;</span>\n<span class=\"w\">
  \     </span><span class=\"nt\">middlewares</span><span class=\"p\">:</span>\n<span
  class=\"w\">        </span><span class=\"c1\"># - default-headers</span>\n<span
  class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
  </span><span class=\"l l-Scalar l-Scalar-Plain\">addprefix-pihole</span>\n<span
  class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
  </span><span class=\"l l-Scalar l-Scalar-Plain\">default-whitelist</span>\n<span
  class=\"w\">      </span><span class=\"nt\">tls</span><span class=\"p\">:</span><span
  class=\"w\"> </span>\n<span class=\"w\">        </span><span class=\"nt\">certResolver</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">letsencrypt</span>\n<span
  class=\"w\">      </span><span class=\"nt\">service</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">pihole</span>\n<span
  class=\"w\">  </span><span class=\"c1\">#region services</span>\n<span class=\"w\">
  \ </span><span class=\"nt\">services</span><span class=\"p\">:</span>\n<span class=\"w\">
  \   </span><span class=\"nt\">pihole</span><span class=\"p\">:</span>\n<span class=\"w\">
  \     </span><span class=\"nt\">loadBalancer</span><span class=\"p\">:</span>\n<span
  class=\"w\">        </span><span class=\"nt\">servers</span><span class=\"p\">:</span>\n<span
  class=\"w\">          </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
  </span><span class=\"nt\">url</span><span class=\"p\">:</span><span class=\"w\">
  </span><span class=\"s\">&quot;http://192.168.1.3:80&quot;</span>\n<span class=\"w\">
  \       </span><span class=\"nt\">passHostHeader</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
  class=\"w\">  </span><span class=\"c1\">#endregion</span>\n<span class=\"w\">  </span><span
  class=\"nt\">middlewares</span><span class=\"p\">:</span>\n<span class=\"w\">    </span><span
  class=\"nt\">addprefix-pihole</span><span class=\"p\">:</span>\n<span class=\"w\">
  \     </span><span class=\"nt\">addPrefix</span><span class=\"p\">:</span>\n<span
  class=\"w\">        </span><span class=\"nt\">prefix</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"s\">&quot;/admin&quot;</span>\n<span class=\"w\">
  \   </span><span class=\"nt\">https-redirect</span><span class=\"p\">:</span>\n<span
  class=\"w\">      </span><span class=\"nt\">redirectScheme</span><span class=\"p\">:</span>\n<span
  class=\"w\">        </span><span class=\"nt\">scheme</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">https</span>\n\n<span
  class=\"w\">    </span><span class=\"nt\">default-headers</span><span class=\"p\">:</span>\n<span
  class=\"w\">      </span><span class=\"nt\">headers</span><span class=\"p\">:</span>\n<span
  class=\"w\">        </span><span class=\"nt\">frameDeny</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
  class=\"w\">        </span><span class=\"nt\">sslRedirect</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
  class=\"w\">        </span><span class=\"nt\">browserXssFilter</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
  class=\"w\">        </span><span class=\"nt\">contentTypeNosniff</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
  class=\"w\">        </span><span class=\"nt\">forceSTSHeader</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
  class=\"w\">        </span><span class=\"nt\">stsIncludeSubdomains</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
  class=\"w\">        </span><span class=\"nt\">stsPreload</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
  class=\"w\">        </span><span class=\"nt\">stsSeconds</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">15552000</span>\n<span
  class=\"w\">        </span><span class=\"nt\">customFrameOptionsValue</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">SAMEORIGIN</span>\n\n<span
  class=\"w\">    </span><span class=\"nt\">default-whitelist</span><span class=\"p\">:</span>\n<span
  class=\"w\">      </span><span class=\"nt\">ipWhiteList</span><span class=\"p\">:</span>\n<span
  class=\"w\">        </span><span class=\"nt\">sourceRange</span><span class=\"p\">:</span>\n<span
  class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
  </span><span class=\"s\">&quot;10.6.0.0/24&quot;</span><span class=\"w\">  </span><span
  class=\"c1\"># wg</span>\n<span class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span
  class=\"w\"> </span><span class=\"s\">&quot;192.168.1.0/24&quot;</span><span class=\"w\">
  \ </span><span class=\"c1\"># lan</span>\n<span class=\"w\">        </span><span
  class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;172.17.0.0/16&quot;</span><span
  class=\"w\">  </span><span class=\"c1\"># docker</span>\n\n<span class=\"w\">    </span><span
  class=\"nt\">secured</span><span class=\"p\">:</span>\n<span class=\"w\">      </span><span
  class=\"nt\">chain</span><span class=\"p\">:</span>\n<span class=\"w\">        </span><span
  class=\"nt\">middlewares</span><span class=\"p\">:</span>\n<span class=\"w\">        </span><span
  class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"l l-Scalar
  l-Scalar-Plain\">default-whitelist</span>\n<span class=\"w\">        </span><span
  class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"l l-Scalar
  l-Scalar-Plain\">default-headers</span>\n</code></pre></div>\n<h1 id=\"docker-labels\">Docker
  labels</h1>\n<p>Now the real magic is with Docker.\nHere is an example docker-compose
  file for spinning up a <a href=\"https://jellyfin.org/\">jellyfin</a> server that
  you want to expose to the world, or at least access at home with <code>jellyfin.example.com</code>
  instead of <code>http://192.168.1.N:8096</code>...</p>\n<p>I left some of the ansible
  variable stuff in here, but the main part to be concerned with is the <code>labels</code>
  section...</p>\n<p>We define just a few labels to throw onto this docker container
  which let's traefik discover it automatically and apply any settings necessary (like
  my <code>ipWhiteList</code>).</p>\n<ul>\n<li><code>traefik.enable</code> is either
  True or False. </li>\n<li><code>traefik.http.router.jellyfin.rule</code> defines
  an http router called jellyfin and sets the url to <code>jellyfin.example.com</code>
  (if example.com was my <code>ansible_nas_domain</code>)</li>\n<li><code>traefik.http.routers.jellyfin.tls.certresolver</code>
  is set to letsencrypt since I use LE for my wildcard certs.</li>\n<li><code>traefik.http.routers.jellyfin.tls.domains[0].main</code>
  will just be <code>example.com</code> -&gt; and this should remind you of the toml
  file above</li>\n<li><code>traefik.http.routers.jellyfin.tls.domains[0].sans</code>
  is set to <code>*.example.com</code></li>\n<li><code>traefik.http.services.jellyfin.loadbalancer.server.port</code>
  is set to jellyfin's default http port of 8096, which tells traefik which port to
  point to for this service.</li>\n</ul>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"nt\">name</span><span class=\"p\">:</span><span class=\"w\"> </span><span
  class=\"l l-Scalar l-Scalar-Plain\">jellyfin</span>\n<span class=\"nt\">image</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">linuxserver/jellyfin</span>\n<span
  class=\"nt\">volumes</span><span class=\"p\">:</span>\n<span class=\"w\">  </span><span
  class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;:/config:rw&quot;</span>\n<span
  class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span
  class=\"s\">&quot;:/movies:&quot;</span>\n<span class=\"w\">  </span><span class=\"p
  p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;:/music:&quot;</span>\n<span
  class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span
  class=\"s\">&quot;:/photos:&quot;</span>\n<span class=\"w\">  </span><span class=\"p
  p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;:/tv:&quot;</span>\n<span
  class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span
  class=\"s\">&quot;:/books:&quot;</span>\n<span class=\"w\">  </span><span class=\"p
  p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;:/audiobooks:&quot;</span>\n<span
  class=\"nt\">ports</span><span class=\"p\">:</span>\n<span class=\"w\">  </span><span
  class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;:8096&quot;</span>\n<span
  class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span
  class=\"s\">&quot;:8920&quot;</span>\n<span class=\"nt\">env</span><span class=\"p\">:</span>\n<span
  class=\"w\">  </span><span class=\"nt\">TZ</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"s\">&quot;&quot;</span>\n<span class=\"w\">  </span><span
  class=\"nt\">PUID</span><span class=\"p\">:</span><span class=\"w\"> </span><span
  class=\"s\">&quot;&quot;</span>\n<span class=\"w\">  </span><span class=\"nt\">PGID</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;&quot;</span>\n<span
  class=\"nt\">restart_policy</span><span class=\"p\">:</span><span class=\"w\"> </span><span
  class=\"l l-Scalar l-Scalar-Plain\">unless-stopped</span>\n<span class=\"nt\">memory</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">1g</span>\n<span
  class=\"nt\">labels</span><span class=\"p\">:</span>\n<span class=\"w\">  </span><span
  class=\"nt\">traefik.enable</span><span class=\"p\">:</span><span class=\"w\"> </span><span
  class=\"s\">&quot;&quot;</span>\n<span class=\"w\">  </span><span class=\"nt\">traefik.http.routers.jellyfin.rule</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;Host(`jellyfin.`)&quot;</span>\n<span
  class=\"w\">  </span><span class=\"nt\">traefik.http.routers.jellyfin.tls.certresolver</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;letsencrypt&quot;</span>\n<span
  class=\"w\">  </span><span class=\"l l-Scalar l-Scalar-Plain\">traefik.http.routers.jellyfin.tls.domains[0].main</span><span
  class=\"p p-Indicator\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;&quot;</span>\n<span
  class=\"w\">  </span><span class=\"l l-Scalar l-Scalar-Plain\">traefik.http.routers.jellyfin.tls.domains[0].sans</span><span
  class=\"p p-Indicator\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;*.&quot;</span>\n<span
  class=\"w\">  </span><span class=\"nt\">traefik.http.services.jellyfin.loadbalancer.server.port</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;8096&quot;</span>\n</code></pre></div>\n<p>And
  just like that traefik will automagically find your jellyfin container and route
  <code>jellyfin.example.com</code> to it!</p>\n<div class='prevnext'>\n\n    <style
  type='text/css'>\n\n    :root {\n      --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle:
  #83dcc8cc;\n      --prevnext-subtitle-brightness: 3;\n    }\n    [data-theme=\"light\"]
  {\n      --prevnext-color-text: #1f2022;\n      --prevnext-color-angle: #ffeb00;\n
  \     --prevnext-subtitle-brightness: 3;\n    }\n    [data-theme=\"dark\"] {\n      --prevnext-color-text:
  #d8ebe6;\n      --prevnext-color-angle: #83dcc8cc;\n      --prevnext-subtitle-brightness:
  3;\n    }\n    .prevnext {\n      display: flex;\n      flex-direction: row;\n      justify-content:
  space-around;\n      align-items: flex-start;\n    }\n    .prevnext a {\n      display:
  flex;\n      align-items: center;\n      width: 100%;\n      text-decoration: none;\n
  \   }\n    a.next {\n      justify-content: flex-end;\n    }\n    .prevnext a:hover
  {\n      background: #00000006;\n    }\n    .prevnext-subtitle {\n      color: var(--prevnext-color-text);\n
  \     filter: brightness(var(--prevnext-subtitle-brightness));\n      font-size:
  .8rem;\n    }\n    .prevnext-title {\n      color: var(--prevnext-color-text);\n
  \     font-size: 1rem;\n    }\n    .prevnext-text {\n      max-width: 30vw;\n    }\n
  \   </style>\n\n    <a class='prev' href='/dataframe-memory-usage'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Dataframe-Memory-Usage</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/tree'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Tree</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: 'If you don I like Traefik a lot because once I get some basic config
  up it In 2022 I A simple docker-compose file for traefik might look like this: I
  use Ansible to deploy most of my services at home, including traefik. My main homelab
  repo is  If yo'
now: 2024-10-12 11:09:11.872435
path: pages/blog/traefik-01.md
published: true
slug: traefik-01
super_description: 'If you don I like Traefik a lot because once I get some basic
  config up it In 2022 I A simple docker-compose file for traefik might look like
  this: I use Ansible to deploy most of my services at home, including traefik. My
  main homelab repo is  If you want my stuff then be sure to go to the  You can see
  the ansible stuff for traefik  I use a  Traefik also has a handy web ui that with
  this config you can find on port  The docker provider lets traefik auto-discover
  new services that I deploy and a'
tags:
- homelab
- tech
templateKey: blog-post
title: Traefik-01
today: 2024-10-12
---

# Traefik

If you don't know about [traefik](https://doc.traefik.io/traefik/) and you need a reverse-proxy then you might want to check it out.
I used to use nginx for my reverse proxy but the config was over my head, and once it was working I was afraid to touch it.
Traefik brings a lot to the table, my main uses are reverse proxy and ip whitelisting, but it's doing even more under the hood that I don't have a full-grasp of yet.

I like Traefik a lot because once I get some basic config up it's incredibly easy to add services into my homelab whether they run on my primary server or not.
This will not be exhaustive but I'll outline my simple setup process of traefik and how I add services whether they are in docker or not.

# Docker

In 2022 I'm still a docker fan-boy and I run my traefik instance in a docker container. 
This isn't necessary but I love the portability since my homelab is very dynamic at the moment.
And even if it wasn't I'd still want to keep traefik in docker because deployment and updating are just so flipping easy

A simple docker-compose file for traefik might look like this:

```yaml
name: traefik
image: "traefik:v2.4"
network_mode: host
volumes:
  - "docker-data/traefik/traefik.toml:/etc/traefik/traefik.toml:ro"
  - "docker-data/traefik/config.yml:/etc/traefik/config.yml:ro"
  - "docker-data/traefik/letsencrypt:/letsencrypt:rw"
  - "/var/run/docker.sock:/var/run/docker.sock:ro"  # for auto-discovery
env: ""
restart_policy: unless-stopped
memory: "1g"
```

# Ansible deployment

__I plan to have more on my homelab and Ansible on this site eventually...__

I use Ansible to deploy most of my services at home, including traefik. My main homelab repo is [here](https://github.com/nicpayne713/ansible-nas) which is a fork of [Ansible NAS](https://github.com/davestephens/ansible-nas).

> If you want my stuff then be sure to go to the `user/nic` branch on my fork

You can see the ansible stuff for traefik [here](https://github.com/davestephens/ansible-nas/tree/master/roles/traefik)

# Config

I use a `traefik.toml` as the main config and it looks something like this.
With ansible a lot of this is done through template variables but this is the general idea.
This config tells traefik what ports to listen and forward on, and gives the names to be referenced by docker labels (down below). 

Traefik also has a handy web ui that with this config you can find on port `8080`.
There is a `providers` section - which is one of the biggest selling points of traefik for me.
I have a docker provider configured  and a static file. 

The docker provider lets traefik auto-discover new services that I deploy and automatically handle the routing!
The static file lets me easily add non-dockerized service routing, or routing to dockerized services on another host (I think traefik has an easier way to do this automatically but I don't do it often enough to need that kind of automation).
Then at the bottom is the SSL cert stuff. 
Using Let's Encrypt is pretty easy and I use Cloudflare as my DNS provider

```toml

[entryPoints]
[entryPoints.web]
address = ":80"

[entryPoints.web.http.redirections.entryPoint]
to = "websecure"

[entryPoints.websecure]
address = ":443"

[entryPoints.websecure.http.tls]
certResolver = "letsencrypt"

[entryPoints.websecure.http.tls.domains]
main = "example.com"
sans = [
"*.example.com"
]

[entryPoints.traefik]
address = ":8080"

[providers]
providersThrottleDuration = "1s"
[providers.docker]
exposedbydefault = false
[providers.file]
filename = "/etc/traefik/config.yml"

[api]
insecure = true
dashboard = true

[log]
level = "INFO"

[ping]
terminatingStatusCode = 0

[certificatesResolvers]
[certificatesResolvers.letsencrypt]
[certificatesResolvers.letsencrypt.acme]
email = "my_email@example.com"
storage = "/letsencrypt/acme.json"
caserver = "https://acme-staging-v02.api.letsencrypt.org/directory"  # le staging, not prod

[certificatesResolvers.letsencrypt.acme.dnsChallenge]
provider = "cloudflare"
```

# Providers.file

To my knowledge there isn't much to configure on the docker provider side of things until you deploy a service.
But the provider config file should get a little screen time here.

The file defines a traefik http router for each service you define, in this case just `pihole`. 

Here I am adding my pihole instance which is not run inside docker but is inside a VM on another host.
I want the `entryPoints` to be set to `websecure` which is configured above in the http redirects.
I want some middlewares, `addprefix-pihole` and `default-headers`, which I'll explain below.
I set letsencrypt as the cert certResolver.
Finally I name the service `pihole`.

Then in the `services` section I configure where pihole is located by just giving the internal IP for traefik to route to.
Finally I define my middlewares. 
To get to the pihole homepage you need to use the route `/admin` so I want that added automatically when I go to `pihole.example.com` so I come to `pihole.example.com/admin`.
And I wanted to restrict access to just my internal network and my wireguard network - this is done with the `default-whitelist`. 
The last thing is to configure a chain of middlewares that I called `secured` which is just easier for the docker labels later on.

With this config in play though, traefik will know about the route `pihole.example.com` and handle the ip whitelisting and load balancing for me.

```yaml
http:
 #region routers 
  routers:
    pihole:
      entryPoints:
        - "websecure"
      rule: "Host(`pihole.example.com`)"
      middlewares:
        # - default-headers
        - addprefix-pihole
        - default-whitelist
      tls: 
        certResolver: letsencrypt
      service: pihole
  #region services
  services:
    pihole:
      loadBalancer:
        servers:
          - url: "http://192.168.1.3:80"
        passHostHeader: true
  #endregion
  middlewares:
    addprefix-pihole:
      addPrefix:
        prefix: "/admin"
    https-redirect:
      redirectScheme:
        scheme: https

    default-headers:
      headers:
        frameDeny: true
        sslRedirect: true
        browserXssFilter: true
        contentTypeNosniff: true
        forceSTSHeader: true
        stsIncludeSubdomains: true
        stsPreload: true
        stsSeconds: 15552000
        customFrameOptionsValue: SAMEORIGIN

    default-whitelist:
      ipWhiteList:
        sourceRange:
        - "10.6.0.0/24"  # wg
        - "192.168.1.0/24"  # lan
        - "172.17.0.0/16"  # docker

    secured:
      chain:
        middlewares:
        - default-whitelist
        - default-headers
```


# Docker labels

Now the real magic is with Docker.
Here is an example docker-compose file for spinning up a [jellyfin](https://jellyfin.org/) server that you want to expose to the world, or at least access at home with `jellyfin.example.com` instead of `http://192.168.1.N:8096`...

I left some of the ansible variable stuff in here, but the main part to be concerned with is the `labels` section...

We define just a few labels to throw onto this docker container which let's traefik discover it automatically and apply any settings necessary (like my `ipWhiteList`).

* `traefik.enable` is either True or False. 
* `traefik.http.router.jellyfin.rule` defines an http router called jellyfin and sets the url to `jellyfin.example.com` (if example.com was my `ansible_nas_domain`)
* `traefik.http.routers.jellyfin.tls.certresolver` is set to letsencrypt since I use LE for my wildcard certs.
* `traefik.http.routers.jellyfin.tls.domains[0].main` will just be `example.com` -> and this should remind you of the toml file above
* `traefik.http.routers.jellyfin.tls.domains[0].sans` is set to `*.example.com`
* `traefik.http.services.jellyfin.loadbalancer.server.port` is set to jellyfin's default http port of 8096, which tells traefik which port to point to for this service.

```yaml
name: jellyfin
image: linuxserver/jellyfin
volumes:
  - ":/config:rw"
  - ":/movies:"
  - ":/music:"
  - ":/photos:"
  - ":/tv:"
  - ":/books:"
  - ":/audiobooks:"
ports:
  - ":8096"
  - ":8920"
env:
  TZ: ""
  PUID: ""
  PGID: ""
restart_policy: unless-stopped
memory: 1g
labels:
  traefik.enable: ""
  traefik.http.routers.jellyfin.rule: "Host(`jellyfin.`)"
  traefik.http.routers.jellyfin.tls.certresolver: "letsencrypt"
  traefik.http.routers.jellyfin.tls.domains[0].main: ""
  traefik.http.routers.jellyfin.tls.domains[0].sans: "*."
  traefik.http.services.jellyfin.loadbalancer.server.port: "8096"
```


And just like that traefik will automagically find your jellyfin container and route `jellyfin.example.com` to it!
<div class='prevnext'>

    <style type='text/css'>

    :root {
      --prevnext-color-text: #d8ebe6;
      --prevnext-color-angle: #83dcc8cc;
      --prevnext-subtitle-brightness: 3;
    }
    [data-theme="light"] {
      --prevnext-color-text: #1f2022;
      --prevnext-color-angle: #ffeb00;
      --prevnext-subtitle-brightness: 3;
    }
    [data-theme="dark"] {
      --prevnext-color-text: #d8ebe6;
      --prevnext-color-angle: #83dcc8cc;
      --prevnext-subtitle-brightness: 3;
    }
    .prevnext {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: flex-start;
    }
    .prevnext a {
      display: flex;
      align-items: center;
      width: 100%;
      text-decoration: none;
    }
    a.next {
      justify-content: flex-end;
    }
    .prevnext a:hover {
      background: #00000006;
    }
    .prevnext-subtitle {
      color: var(--prevnext-color-text);
      filter: brightness(var(--prevnext-subtitle-brightness));
      font-size: .8rem;
    }
    .prevnext-title {
      color: var(--prevnext-color-text);
      font-size: 1rem;
    }
    .prevnext-text {
      max-width: 30vw;
    }
    </style>
    
    <a class='prev' href='/dataframe-memory-usage'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Dataframe-Memory-Usage</p>
        </div>
    </a>
    
    <a class='next' href='/tree'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Tree</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>