---
article_html: "<p><code>man</code> can be a pain to read... and there's lots of alternatives
  out there and one I've just started playing with is <a href=\"https://github.com/cheat/cheat\">cheat</a></p>\n<p><code>man
  man</code> will give you this plus a billion more lines of docs, which is useful
  when you need it...</p>\n<div class=\"highlight\"><pre><span></span><code>MAN<span
  class=\"o\">(</span><span class=\"m\">1</span><span class=\"o\">)</span><span class=\"w\">
  \                                                                                                                      </span>Manual<span
  class=\"w\"> </span>pager<span class=\"w\"> </span>utils<span class=\"w\">                                                                                                                      </span>MAN<span
  class=\"o\">(</span><span class=\"m\">1</span><span class=\"o\">)</span>\n\nNAME\n<span
  class=\"w\">       </span>man<span class=\"w\"> </span>-<span class=\"w\"> </span>an<span
  class=\"w\"> </span>interface<span class=\"w\"> </span>to<span class=\"w\"> </span>the<span
  class=\"w\"> </span>on-line<span class=\"w\"> </span>reference<span class=\"w\">
  </span>manuals\n\nSYNOPSIS\n<span class=\"w\">       </span>man<span class=\"w\">
  \ </span><span class=\"o\">[</span>-C<span class=\"w\">  </span>file<span class=\"o\">]</span><span
  class=\"w\">  </span><span class=\"o\">[</span>-d<span class=\"o\">]</span><span
  class=\"w\"> </span><span class=\"o\">[</span>-D<span class=\"o\">]</span><span
  class=\"w\"> </span><span class=\"o\">[</span>--warnings<span class=\"o\">[=</span>warnings<span
  class=\"o\">]]</span><span class=\"w\"> </span><span class=\"o\">[</span>-R<span
  class=\"w\"> </span>encoding<span class=\"o\">]</span><span class=\"w\"> </span><span
  class=\"o\">[</span>-L<span class=\"w\"> </span>locale<span class=\"o\">]</span><span
  class=\"w\"> </span><span class=\"o\">[</span>-m<span class=\"w\"> </span>system<span
  class=\"o\">[</span>,...<span class=\"o\">]]</span><span class=\"w\"> </span><span
  class=\"o\">[</span>-M<span class=\"w\"> </span>path<span class=\"o\">]</span><span
  class=\"w\"> </span><span class=\"o\">[</span>-S<span class=\"w\"> </span>list<span
  class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-e<span
  class=\"w\"> </span>extension<span class=\"o\">]</span><span class=\"w\"> </span><span
  class=\"o\">[</span>-i<span class=\"p\">|</span>-I<span class=\"o\">]</span><span
  class=\"w\"> </span><span class=\"o\">[</span>--regex<span class=\"p\">|</span>--wildcard<span
  class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>--names-only<span
  class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-a<span
  class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-u<span
  class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>--no-subpages<span
  class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-P<span
  class=\"w\"> </span>pager<span class=\"o\">]</span><span class=\"w\"> </span><span
  class=\"o\">[</span>-r<span class=\"w\"> </span>prompt<span class=\"o\">]</span><span
  class=\"w\"> </span><span class=\"o\">[</span>-7<span class=\"o\">]</span><span
  class=\"w\"> </span><span class=\"o\">[</span>-E<span class=\"w\"> </span>encoding<span
  class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>--no-hyphenation<span
  class=\"o\">]</span>\n<span class=\"w\">       </span><span class=\"o\">[</span>--no-justification<span
  class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-p<span
  class=\"w\"> </span>string<span class=\"o\">]</span><span class=\"w\"> </span><span
  class=\"o\">[</span>-t<span class=\"o\">]</span><span class=\"w\"> </span><span
  class=\"o\">[</span>-T<span class=\"o\">[</span>device<span class=\"o\">]]</span><span
  class=\"w\"> </span><span class=\"o\">[</span>-H<span class=\"o\">[</span>browser<span
  class=\"o\">]]</span><span class=\"w\"> </span><span class=\"o\">[</span>-X<span
  class=\"o\">[</span>dpi<span class=\"o\">]]</span><span class=\"w\"> </span><span
  class=\"o\">[</span>-Z<span class=\"o\">]</span><span class=\"w\"> </span><span
  class=\"o\">[[</span>section<span class=\"o\">]</span><span class=\"w\"> </span>page<span
  class=\"o\">[</span>.section<span class=\"o\">]</span><span class=\"w\"> </span>...<span
  class=\"o\">]</span><span class=\"w\"> </span>...\n<span class=\"w\">       </span>man<span
  class=\"w\"> </span>-k<span class=\"w\"> </span><span class=\"o\">[</span>apropos<span
  class=\"w\"> </span>options<span class=\"o\">]</span><span class=\"w\"> </span>regexp<span
  class=\"w\"> </span>...\n<span class=\"w\">       </span>man<span class=\"w\"> </span>-K<span
  class=\"w\"> </span><span class=\"o\">[</span>-w<span class=\"p\">|</span>-W<span
  class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-S<span
  class=\"w\"> </span>list<span class=\"o\">]</span><span class=\"w\"> </span><span
  class=\"o\">[</span>-i<span class=\"p\">|</span>-I<span class=\"o\">]</span><span
  class=\"w\"> </span><span class=\"o\">[</span>--regex<span class=\"o\">]</span><span
  class=\"w\"> </span><span class=\"o\">[</span>section<span class=\"o\">]</span><span
  class=\"w\"> </span>term<span class=\"w\"> </span>...\n<span class=\"w\">       </span>man<span
  class=\"w\"> </span>-f<span class=\"w\"> </span><span class=\"o\">[</span>whatis<span
  class=\"w\"> </span>options<span class=\"o\">]</span><span class=\"w\"> </span>page<span
  class=\"w\"> </span>...\n<span class=\"w\">       </span>man<span class=\"w\"> </span>-l<span
  class=\"w\"> </span><span class=\"o\">[</span>-C<span class=\"w\"> </span>file<span
  class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-d<span
  class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-D<span
  class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>--warnings<span
  class=\"o\">[=</span>warnings<span class=\"o\">]]</span><span class=\"w\"> </span><span
  class=\"o\">[</span>-R<span class=\"w\"> </span>encoding<span class=\"o\">]</span><span
  class=\"w\"> </span><span class=\"o\">[</span>-L<span class=\"w\"> </span>locale<span
  class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-P<span
  class=\"w\"> </span>pager<span class=\"o\">]</span><span class=\"w\"> </span><span
  class=\"o\">[</span>-r<span class=\"w\"> </span>prompt<span class=\"o\">]</span><span
  class=\"w\"> </span><span class=\"o\">[</span>-7<span class=\"o\">]</span><span
  class=\"w\"> </span><span class=\"o\">[</span>-E<span class=\"w\"> </span>encoding<span
  class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-p<span
  class=\"w\"> </span>string<span class=\"o\">]</span><span class=\"w\"> </span><span
  class=\"o\">[</span>-t<span class=\"o\">]</span><span class=\"w\"> </span><span
  class=\"o\">[</span>-T<span class=\"o\">[</span>device<span class=\"o\">]]</span><span
  class=\"w\"> </span><span class=\"o\">[</span>-H<span class=\"o\">[</span>browser<span
  class=\"o\">]]</span><span class=\"w\"> </span><span class=\"o\">[</span>-X<span
  class=\"o\">[</span>dpi<span class=\"o\">]]</span><span class=\"w\"> </span><span
  class=\"o\">[</span>-Z<span class=\"o\">]</span><span class=\"w\"> </span>file<span
  class=\"w\"> </span>...\n<span class=\"w\">       </span>man<span class=\"w\"> </span>-w<span
  class=\"p\">|</span>-W<span class=\"w\"> </span><span class=\"o\">[</span>-C<span
  class=\"w\"> </span>file<span class=\"o\">]</span><span class=\"w\"> </span><span
  class=\"o\">[</span>-d<span class=\"o\">]</span><span class=\"w\"> </span><span
  class=\"o\">[</span>-D<span class=\"o\">]</span><span class=\"w\"> </span>page<span
  class=\"w\"> </span>...\n<span class=\"w\">       </span>man<span class=\"w\"> </span>-c<span
  class=\"w\"> </span><span class=\"o\">[</span>-C<span class=\"w\"> </span>file<span
  class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-d<span
  class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-D<span
  class=\"o\">]</span><span class=\"w\"> </span>page<span class=\"w\"> </span>...\n<span
  class=\"w\">       </span>man<span class=\"w\"> </span><span class=\"o\">[</span>-?V<span
  class=\"o\">]</span>\n\nDESCRIPTION\n<span class=\"w\">       </span>man<span class=\"w\">
  </span>is<span class=\"w\"> </span>the<span class=\"w\"> </span>system<span class=\"err\">&#39;</span>s<span
  class=\"w\"> </span>manual<span class=\"w\"> </span>pager.<span class=\"w\">  </span>Each<span
  class=\"w\"> </span>page<span class=\"w\"> </span>argument<span class=\"w\"> </span>given<span
  class=\"w\"> </span>to<span class=\"w\"> </span>man<span class=\"w\"> </span>is<span
  class=\"w\"> </span>normally<span class=\"w\"> </span>the<span class=\"w\"> </span>name<span
  class=\"w\"> </span>of<span class=\"w\"> </span>a<span class=\"w\"> </span>program,<span
  class=\"w\"> </span>utility<span class=\"w\"> </span>or<span class=\"w\"> </span><span
  class=\"k\">function</span>.<span class=\"w\">  </span>The<span class=\"w\"> </span>manual<span
  class=\"w\"> </span>page<span class=\"w\"> </span>associated<span class=\"w\"> </span>with<span
  class=\"w\"> </span>each<span class=\"w\"> </span>of<span class=\"w\"> </span>these<span
  class=\"w\"> </span>arguments<span class=\"w\"> </span>is<span class=\"w\"> </span><span
  class=\"k\">then</span><span class=\"w\"> </span>found<span class=\"w\"> </span>and<span
  class=\"w\"> </span>displayed.<span class=\"w\">  </span>A<span class=\"w\"> </span>section,<span
  class=\"w\"> </span><span class=\"k\">if</span><span class=\"w\"> </span>provided,<span
  class=\"w\"> </span>will<span class=\"w\"> </span>direct<span class=\"w\">  </span>man<span
  class=\"w\">  </span>to<span class=\"w\">  </span>look\n<span class=\"w\">       </span>only<span
  class=\"w\">  </span><span class=\"k\">in</span><span class=\"w\">  </span>that<span
  class=\"w\">  </span>section<span class=\"w\"> </span>of<span class=\"w\"> </span>the<span
  class=\"w\"> </span>manual.<span class=\"w\">  </span>The<span class=\"w\"> </span>default<span
  class=\"w\"> </span>action<span class=\"w\"> </span>is<span class=\"w\"> </span>to<span
  class=\"w\"> </span>search<span class=\"w\"> </span><span class=\"k\">in</span><span
  class=\"w\"> </span>all<span class=\"w\"> </span>of<span class=\"w\"> </span>the<span
  class=\"w\"> </span>available<span class=\"w\"> </span>sections<span class=\"w\">
  </span>following<span class=\"w\"> </span>a<span class=\"w\"> </span>pre-defined<span
  class=\"w\"> </span>order<span class=\"w\"> </span><span class=\"o\">(</span><span
  class=\"s2\">&quot;1 n l 8 3 2 3posix 3pm 3perl 3am 5 4 9 6 7&quot;</span><span
  class=\"w\"> </span>by<span class=\"w\"> </span>default,<span class=\"w\"> </span>unless<span
  class=\"w\"> </span>overridden<span class=\"w\"> </span>by<span class=\"w\"> </span>the<span
  class=\"w\"> </span>SECTION<span class=\"w\"> </span>directive<span class=\"w\">
  </span><span class=\"k\">in</span><span class=\"w\"> </span>/etc/manpath.config<span
  class=\"o\">)</span>,\n<span class=\"w\">       </span>and<span class=\"w\"> </span>to<span
  class=\"w\"> </span>show<span class=\"w\"> </span>only<span class=\"w\"> </span>the<span
  class=\"w\"> </span>first<span class=\"w\"> </span>page<span class=\"w\"> </span>found,<span
  class=\"w\"> </span>even<span class=\"w\"> </span><span class=\"k\">if</span><span
  class=\"w\"> </span>page<span class=\"w\"> </span>exists<span class=\"w\"> </span><span
  class=\"k\">in</span><span class=\"w\"> </span>several<span class=\"w\"> </span>sections.\n\n<span
  class=\"w\">       </span>The<span class=\"w\"> </span>table<span class=\"w\"> </span>below<span
  class=\"w\"> </span>shows<span class=\"w\"> </span>the<span class=\"w\"> </span>section<span
  class=\"w\"> </span>numbers<span class=\"w\"> </span>of<span class=\"w\"> </span>the<span
  class=\"w\"> </span>manual<span class=\"w\"> </span>followed<span class=\"w\"> </span>by<span
  class=\"w\"> </span>the<span class=\"w\"> </span>types<span class=\"w\"> </span>of<span
  class=\"w\"> </span>pages<span class=\"w\"> </span>they<span class=\"w\"> </span>contain.\n\n<span
  class=\"w\">       </span><span class=\"m\">1</span><span class=\"w\">   </span>Executable<span
  class=\"w\"> </span>programs<span class=\"w\"> </span>or<span class=\"w\"> </span>shell<span
  class=\"w\"> </span>commands\n<span class=\"w\">       </span><span class=\"m\">2</span><span
  class=\"w\">   </span>System<span class=\"w\"> </span>calls<span class=\"w\"> </span><span
  class=\"o\">(</span>functions<span class=\"w\"> </span>provided<span class=\"w\">
  </span>by<span class=\"w\"> </span>the<span class=\"w\"> </span>kernel<span class=\"o\">)</span>\n<span
  class=\"w\">       </span><span class=\"m\">3</span><span class=\"w\">   </span>Library<span
  class=\"w\"> </span>calls<span class=\"w\"> </span><span class=\"o\">(</span>functions<span
  class=\"w\"> </span>within<span class=\"w\"> </span>program<span class=\"w\"> </span>libraries<span
  class=\"o\">)</span>\n<span class=\"w\">       </span><span class=\"m\">4</span><span
  class=\"w\">   </span>Special<span class=\"w\"> </span>files<span class=\"w\"> </span><span
  class=\"o\">(</span>usually<span class=\"w\"> </span>found<span class=\"w\"> </span><span
  class=\"k\">in</span><span class=\"w\"> </span>/dev<span class=\"o\">)</span>\n<span
  class=\"w\">       </span><span class=\"m\">5</span><span class=\"w\">   </span>File<span
  class=\"w\"> </span>formats<span class=\"w\"> </span>and<span class=\"w\"> </span>conventions<span
  class=\"w\"> </span>eg<span class=\"w\"> </span>/etc/passwd\n<span class=\"w\">
  \      </span><span class=\"m\">6</span><span class=\"w\">   </span>Games\n<span
  class=\"w\">       </span><span class=\"m\">7</span><span class=\"w\">   </span>Miscellaneous<span
  class=\"w\"> </span><span class=\"o\">(</span>including<span class=\"w\"> </span>macro<span
  class=\"w\"> </span>packages<span class=\"w\"> </span>and<span class=\"w\"> </span>conventions<span
  class=\"o\">)</span>,<span class=\"w\"> </span>e.g.<span class=\"w\"> </span>man<span
  class=\"o\">(</span><span class=\"m\">7</span><span class=\"o\">)</span>,<span class=\"w\">
  </span>groff<span class=\"o\">(</span><span class=\"m\">7</span><span class=\"o\">)</span>\n<span
  class=\"w\">       </span><span class=\"m\">8</span><span class=\"w\">   </span>System<span
  class=\"w\"> </span>administration<span class=\"w\"> </span>commands<span class=\"w\">
  </span><span class=\"o\">(</span>usually<span class=\"w\"> </span>only<span class=\"w\">
  </span><span class=\"k\">for</span><span class=\"w\"> </span>root<span class=\"o\">)</span>\n<span
  class=\"w\">       </span><span class=\"m\">9</span><span class=\"w\">   </span>Kernel<span
  class=\"w\"> </span>routines<span class=\"w\"> </span><span class=\"o\">[</span>Non<span
  class=\"w\"> </span>standard<span class=\"o\">]</span>\n\n<span class=\"w\">       </span>A<span
  class=\"w\"> </span>manual<span class=\"w\"> </span>page<span class=\"w\"> </span>consists<span
  class=\"w\"> </span>of<span class=\"w\"> </span>several<span class=\"w\"> </span>sections.\n\n<span
  class=\"w\">       </span>Conventional<span class=\"w\"> </span>section<span class=\"w\">
  </span>names<span class=\"w\"> </span>include<span class=\"w\"> </span>NAME,<span
  class=\"w\"> </span>SYNOPSIS,<span class=\"w\"> </span>CONFIGURATION,<span class=\"w\">
  </span>DESCRIPTION,<span class=\"w\"> </span>OPTIONS,<span class=\"w\"> </span>EXIT<span
  class=\"w\"> </span>STATUS,<span class=\"w\"> </span>RETURN<span class=\"w\"> </span>VALUE,<span
  class=\"w\"> </span>ERRORS,<span class=\"w\"> </span>ENVIRONMENT,<span class=\"w\">
  </span>FILES,<span class=\"w\"> </span>VERSIONS,<span class=\"w\"> </span>CONFORMING<span
  class=\"w\"> </span>TO,<span class=\"w\"> </span>NOTES,<span class=\"w\"> </span>BUGS,<span
  class=\"w\"> </span>EXAMPLE,<span class=\"w\"> </span>AUTHORS,<span class=\"w\">
  </span>and<span class=\"w\"> </span>SEE<span class=\"w\"> </span>ALSO.\n\n<span
  class=\"w\">       </span>The<span class=\"w\"> </span>following<span class=\"w\">
  </span>conventions<span class=\"w\"> </span>apply<span class=\"w\"> </span>to<span
  class=\"w\"> </span>the<span class=\"w\"> </span>SYNOPSIS<span class=\"w\"> </span>section<span
  class=\"w\"> </span>and<span class=\"w\"> </span>can<span class=\"w\"> </span>be<span
  class=\"w\"> </span>used<span class=\"w\"> </span>as<span class=\"w\"> </span>a<span
  class=\"w\"> </span>guide<span class=\"w\"> </span><span class=\"k\">in</span><span
  class=\"w\"> </span>other<span class=\"w\"> </span>sections.\n\n<span class=\"w\">
  \      </span>bold<span class=\"w\"> </span>text<span class=\"w\">          </span><span
  class=\"nb\">type</span><span class=\"w\"> </span>exactly<span class=\"w\"> </span>as<span
  class=\"w\"> </span>shown.\n<span class=\"w\">       </span>italic<span class=\"w\">
  </span>text<span class=\"w\">        </span>replace<span class=\"w\"> </span>with<span
  class=\"w\"> </span>appropriate<span class=\"w\"> </span>argument.\n<span class=\"w\">
  \      </span><span class=\"o\">[</span>-abc<span class=\"o\">]</span><span class=\"w\">
  \            </span>any<span class=\"w\"> </span>or<span class=\"w\"> </span>all<span
  class=\"w\"> </span>arguments<span class=\"w\"> </span>within<span class=\"w\">
  </span><span class=\"o\">[</span><span class=\"w\"> </span><span class=\"o\">]</span><span
  class=\"w\"> </span>are<span class=\"w\"> </span>optional.\n<span class=\"w\">       </span>-a<span
  class=\"p\">|</span>-b<span class=\"w\">              </span>options<span class=\"w\">
  </span>delimited<span class=\"w\"> </span>by<span class=\"w\"> </span><span class=\"p\">|</span><span
  class=\"w\"> </span>cannot<span class=\"w\"> </span>be<span class=\"w\"> </span>used<span
  class=\"w\"> </span>together.\n<span class=\"w\">       </span>argument<span class=\"w\">
  </span>...<span class=\"w\">       </span>argument<span class=\"w\"> </span>is<span
  class=\"w\"> </span>repeatable.\n<span class=\"w\">       </span><span class=\"o\">[</span>expression<span
  class=\"o\">]</span><span class=\"w\"> </span>...<span class=\"w\">   </span>entire<span
  class=\"w\"> </span>expression<span class=\"w\"> </span>within<span class=\"w\">
  </span><span class=\"o\">[</span><span class=\"w\"> </span><span class=\"o\">]</span><span
  class=\"w\"> </span>is<span class=\"w\"> </span>repeatable.\n\n<span class=\"w\">
  \      </span>Exact<span class=\"w\"> </span>rendering<span class=\"w\"> </span>may<span
  class=\"w\"> </span>vary<span class=\"w\"> </span>depending<span class=\"w\"> </span>on<span
  class=\"w\"> </span>the<span class=\"w\"> </span>output<span class=\"w\"> </span>device.<span
  class=\"w\">  </span>For<span class=\"w\"> </span>instance,<span class=\"w\"> </span>man<span
  class=\"w\"> </span>will<span class=\"w\"> </span>usually<span class=\"w\"> </span>not<span
  class=\"w\"> </span>be<span class=\"w\"> </span>able<span class=\"w\"> </span>to<span
  class=\"w\"> </span>render<span class=\"w\"> </span>italics<span class=\"w\"> </span>when<span
  class=\"w\"> </span>running<span class=\"w\"> </span><span class=\"k\">in</span><span
  class=\"w\"> </span>a<span class=\"w\"> </span>terminal,<span class=\"w\"> </span>and<span
  class=\"w\"> </span>will<span class=\"w\"> </span>typically<span class=\"w\"> </span>use<span
  class=\"w\"> </span>underlined<span class=\"w\"> </span>or<span class=\"w\"> </span>coloured<span
  class=\"w\"> </span>text<span class=\"w\"> </span>instead.\n\n<span class=\"w\">
  \      </span>The<span class=\"w\"> </span><span class=\"nb\">command</span><span
  class=\"w\"> </span>or<span class=\"w\"> </span><span class=\"k\">function</span><span
  class=\"w\"> </span>illustration<span class=\"w\"> </span>is<span class=\"w\"> </span>a<span
  class=\"w\"> </span>pattern<span class=\"w\"> </span>that<span class=\"w\"> </span>should<span
  class=\"w\"> </span>match<span class=\"w\"> </span>all<span class=\"w\"> </span>possible<span
  class=\"w\"> </span>invocations.<span class=\"w\">  </span>In<span class=\"w\">
  </span>some<span class=\"w\"> </span>cases<span class=\"w\"> </span>it<span class=\"w\">
  </span>is<span class=\"w\"> </span>advisable<span class=\"w\"> </span>to<span class=\"w\">
  </span>illustrate<span class=\"w\"> </span>several<span class=\"w\"> </span>exclusive<span
  class=\"w\"> </span>invocations<span class=\"w\"> </span>as<span class=\"w\"> </span>is<span
  class=\"w\"> </span>shown<span class=\"w\"> </span><span class=\"k\">in</span><span
  class=\"w\"> </span>the<span class=\"w\"> </span>SYNOPSIS<span class=\"w\"> </span>section<span
  class=\"w\"> </span>of<span class=\"w\"> </span>this<span class=\"w\"> </span>manual<span
  class=\"w\"> </span>page.\n\nEXAMPLES\n<span class=\"w\">       </span>man<span
  class=\"w\"> </span>ls\n<span class=\"w\">           </span>Display<span class=\"w\">
  </span>the<span class=\"w\"> </span>manual<span class=\"w\"> </span>page<span class=\"w\">
  </span><span class=\"k\">for</span><span class=\"w\"> </span>the<span class=\"w\">
  </span>item<span class=\"w\"> </span><span class=\"o\">(</span>program<span class=\"o\">)</span><span
  class=\"w\"> </span>ls.\n\n<span class=\"w\">       </span>man<span class=\"w\">
  </span>man.7\n<span class=\"w\">           </span>Display<span class=\"w\"> </span>the<span
  class=\"w\"> </span>manual<span class=\"w\"> </span>page<span class=\"w\"> </span><span
  class=\"k\">for</span><span class=\"w\"> </span>macro<span class=\"w\"> </span>package<span
  class=\"w\"> </span>man<span class=\"w\"> </span>from<span class=\"w\"> </span>section<span
  class=\"w\"> </span><span class=\"m\">7</span>.\n</code></pre></div>\n<h2 id=\"but-what-if-you-dont\">But
  what if you don't?</h2>\n<p><code>cheat man</code></p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"c1\"># To convert a man page to pdf:</span>\nman<span class=\"w\"> </span>-t<span
  class=\"w\"> </span>bash<span class=\"w\"> </span><span class=\"p\">|</span><span
  class=\"w\"> </span>ps2pdf<span class=\"w\"> </span>-<span class=\"w\"> </span>bash.pdf\n\n<span
  class=\"c1\"># To view the ascii chart:</span>\nman<span class=\"w\"> </span><span
  class=\"m\">7</span><span class=\"w\"> </span>ascii\n</code></pre></div>\n<p>You
  get tiny examples to remind you of what you <strong>probably</strong> are trying
  to do!</p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n    :root {\n
  \     --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle: #83dcc8cc;\n
  \     --prevnext-subtitle-brightness: 3;\n    }\n    [data-theme=\"light\"] {\n
  \     --prevnext-color-text: #1f2022;\n      --prevnext-color-angle: #ffeb00;\n
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
  \   </style>\n\n    <a class='prev' href='/kvm-network-interface-via-nat-ubuntu-20'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>kvm-network-interface-via-nat-ubuntu-20</p>\n
  \       </div>\n    </a>\n\n    <a class='next' href='/reset-ssh-key-passphrase'>\n\n
  \       <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n
  \           <p class='prevnext-title'>Reset SSH key passphrase</p>\n        </div>\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5 15.75L14.25 12L10.5
  8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n  </div>"
cover: ''
date: 2022-06-23
datetime: 2022-06-23 00:00:00+00:00
description: 'man man man cheat man You get tiny examples to remind you of what you '
edit_link: https://github.com/edit/main/pages/til/cheat-on-your-man.md
html: "<p><code>man</code> can be a pain to read... and there's lots of alternatives
  out there and one I've just started playing with is <a href=\"https://github.com/cheat/cheat\">cheat</a></p>\n<p><code>man
  man</code> will give you this plus a billion more lines of docs, which is useful
  when you need it...</p>\n<div class=\"highlight\"><pre><span></span><code>MAN<span
  class=\"o\">(</span><span class=\"m\">1</span><span class=\"o\">)</span><span class=\"w\">
  \                                                                                                                      </span>Manual<span
  class=\"w\"> </span>pager<span class=\"w\"> </span>utils<span class=\"w\">                                                                                                                      </span>MAN<span
  class=\"o\">(</span><span class=\"m\">1</span><span class=\"o\">)</span>\n\nNAME\n<span
  class=\"w\">       </span>man<span class=\"w\"> </span>-<span class=\"w\"> </span>an<span
  class=\"w\"> </span>interface<span class=\"w\"> </span>to<span class=\"w\"> </span>the<span
  class=\"w\"> </span>on-line<span class=\"w\"> </span>reference<span class=\"w\">
  </span>manuals\n\nSYNOPSIS\n<span class=\"w\">       </span>man<span class=\"w\">
  \ </span><span class=\"o\">[</span>-C<span class=\"w\">  </span>file<span class=\"o\">]</span><span
  class=\"w\">  </span><span class=\"o\">[</span>-d<span class=\"o\">]</span><span
  class=\"w\"> </span><span class=\"o\">[</span>-D<span class=\"o\">]</span><span
  class=\"w\"> </span><span class=\"o\">[</span>--warnings<span class=\"o\">[=</span>warnings<span
  class=\"o\">]]</span><span class=\"w\"> </span><span class=\"o\">[</span>-R<span
  class=\"w\"> </span>encoding<span class=\"o\">]</span><span class=\"w\"> </span><span
  class=\"o\">[</span>-L<span class=\"w\"> </span>locale<span class=\"o\">]</span><span
  class=\"w\"> </span><span class=\"o\">[</span>-m<span class=\"w\"> </span>system<span
  class=\"o\">[</span>,...<span class=\"o\">]]</span><span class=\"w\"> </span><span
  class=\"o\">[</span>-M<span class=\"w\"> </span>path<span class=\"o\">]</span><span
  class=\"w\"> </span><span class=\"o\">[</span>-S<span class=\"w\"> </span>list<span
  class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-e<span
  class=\"w\"> </span>extension<span class=\"o\">]</span><span class=\"w\"> </span><span
  class=\"o\">[</span>-i<span class=\"p\">|</span>-I<span class=\"o\">]</span><span
  class=\"w\"> </span><span class=\"o\">[</span>--regex<span class=\"p\">|</span>--wildcard<span
  class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>--names-only<span
  class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-a<span
  class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-u<span
  class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>--no-subpages<span
  class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-P<span
  class=\"w\"> </span>pager<span class=\"o\">]</span><span class=\"w\"> </span><span
  class=\"o\">[</span>-r<span class=\"w\"> </span>prompt<span class=\"o\">]</span><span
  class=\"w\"> </span><span class=\"o\">[</span>-7<span class=\"o\">]</span><span
  class=\"w\"> </span><span class=\"o\">[</span>-E<span class=\"w\"> </span>encoding<span
  class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>--no-hyphenation<span
  class=\"o\">]</span>\n<span class=\"w\">       </span><span class=\"o\">[</span>--no-justification<span
  class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-p<span
  class=\"w\"> </span>string<span class=\"o\">]</span><span class=\"w\"> </span><span
  class=\"o\">[</span>-t<span class=\"o\">]</span><span class=\"w\"> </span><span
  class=\"o\">[</span>-T<span class=\"o\">[</span>device<span class=\"o\">]]</span><span
  class=\"w\"> </span><span class=\"o\">[</span>-H<span class=\"o\">[</span>browser<span
  class=\"o\">]]</span><span class=\"w\"> </span><span class=\"o\">[</span>-X<span
  class=\"o\">[</span>dpi<span class=\"o\">]]</span><span class=\"w\"> </span><span
  class=\"o\">[</span>-Z<span class=\"o\">]</span><span class=\"w\"> </span><span
  class=\"o\">[[</span>section<span class=\"o\">]</span><span class=\"w\"> </span>page<span
  class=\"o\">[</span>.section<span class=\"o\">]</span><span class=\"w\"> </span>...<span
  class=\"o\">]</span><span class=\"w\"> </span>...\n<span class=\"w\">       </span>man<span
  class=\"w\"> </span>-k<span class=\"w\"> </span><span class=\"o\">[</span>apropos<span
  class=\"w\"> </span>options<span class=\"o\">]</span><span class=\"w\"> </span>regexp<span
  class=\"w\"> </span>...\n<span class=\"w\">       </span>man<span class=\"w\"> </span>-K<span
  class=\"w\"> </span><span class=\"o\">[</span>-w<span class=\"p\">|</span>-W<span
  class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-S<span
  class=\"w\"> </span>list<span class=\"o\">]</span><span class=\"w\"> </span><span
  class=\"o\">[</span>-i<span class=\"p\">|</span>-I<span class=\"o\">]</span><span
  class=\"w\"> </span><span class=\"o\">[</span>--regex<span class=\"o\">]</span><span
  class=\"w\"> </span><span class=\"o\">[</span>section<span class=\"o\">]</span><span
  class=\"w\"> </span>term<span class=\"w\"> </span>...\n<span class=\"w\">       </span>man<span
  class=\"w\"> </span>-f<span class=\"w\"> </span><span class=\"o\">[</span>whatis<span
  class=\"w\"> </span>options<span class=\"o\">]</span><span class=\"w\"> </span>page<span
  class=\"w\"> </span>...\n<span class=\"w\">       </span>man<span class=\"w\"> </span>-l<span
  class=\"w\"> </span><span class=\"o\">[</span>-C<span class=\"w\"> </span>file<span
  class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-d<span
  class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-D<span
  class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>--warnings<span
  class=\"o\">[=</span>warnings<span class=\"o\">]]</span><span class=\"w\"> </span><span
  class=\"o\">[</span>-R<span class=\"w\"> </span>encoding<span class=\"o\">]</span><span
  class=\"w\"> </span><span class=\"o\">[</span>-L<span class=\"w\"> </span>locale<span
  class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-P<span
  class=\"w\"> </span>pager<span class=\"o\">]</span><span class=\"w\"> </span><span
  class=\"o\">[</span>-r<span class=\"w\"> </span>prompt<span class=\"o\">]</span><span
  class=\"w\"> </span><span class=\"o\">[</span>-7<span class=\"o\">]</span><span
  class=\"w\"> </span><span class=\"o\">[</span>-E<span class=\"w\"> </span>encoding<span
  class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-p<span
  class=\"w\"> </span>string<span class=\"o\">]</span><span class=\"w\"> </span><span
  class=\"o\">[</span>-t<span class=\"o\">]</span><span class=\"w\"> </span><span
  class=\"o\">[</span>-T<span class=\"o\">[</span>device<span class=\"o\">]]</span><span
  class=\"w\"> </span><span class=\"o\">[</span>-H<span class=\"o\">[</span>browser<span
  class=\"o\">]]</span><span class=\"w\"> </span><span class=\"o\">[</span>-X<span
  class=\"o\">[</span>dpi<span class=\"o\">]]</span><span class=\"w\"> </span><span
  class=\"o\">[</span>-Z<span class=\"o\">]</span><span class=\"w\"> </span>file<span
  class=\"w\"> </span>...\n<span class=\"w\">       </span>man<span class=\"w\"> </span>-w<span
  class=\"p\">|</span>-W<span class=\"w\"> </span><span class=\"o\">[</span>-C<span
  class=\"w\"> </span>file<span class=\"o\">]</span><span class=\"w\"> </span><span
  class=\"o\">[</span>-d<span class=\"o\">]</span><span class=\"w\"> </span><span
  class=\"o\">[</span>-D<span class=\"o\">]</span><span class=\"w\"> </span>page<span
  class=\"w\"> </span>...\n<span class=\"w\">       </span>man<span class=\"w\"> </span>-c<span
  class=\"w\"> </span><span class=\"o\">[</span>-C<span class=\"w\"> </span>file<span
  class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-d<span
  class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-D<span
  class=\"o\">]</span><span class=\"w\"> </span>page<span class=\"w\"> </span>...\n<span
  class=\"w\">       </span>man<span class=\"w\"> </span><span class=\"o\">[</span>-?V<span
  class=\"o\">]</span>\n\nDESCRIPTION\n<span class=\"w\">       </span>man<span class=\"w\">
  </span>is<span class=\"w\"> </span>the<span class=\"w\"> </span>system<span class=\"err\">&#39;</span>s<span
  class=\"w\"> </span>manual<span class=\"w\"> </span>pager.<span class=\"w\">  </span>Each<span
  class=\"w\"> </span>page<span class=\"w\"> </span>argument<span class=\"w\"> </span>given<span
  class=\"w\"> </span>to<span class=\"w\"> </span>man<span class=\"w\"> </span>is<span
  class=\"w\"> </span>normally<span class=\"w\"> </span>the<span class=\"w\"> </span>name<span
  class=\"w\"> </span>of<span class=\"w\"> </span>a<span class=\"w\"> </span>program,<span
  class=\"w\"> </span>utility<span class=\"w\"> </span>or<span class=\"w\"> </span><span
  class=\"k\">function</span>.<span class=\"w\">  </span>The<span class=\"w\"> </span>manual<span
  class=\"w\"> </span>page<span class=\"w\"> </span>associated<span class=\"w\"> </span>with<span
  class=\"w\"> </span>each<span class=\"w\"> </span>of<span class=\"w\"> </span>these<span
  class=\"w\"> </span>arguments<span class=\"w\"> </span>is<span class=\"w\"> </span><span
  class=\"k\">then</span><span class=\"w\"> </span>found<span class=\"w\"> </span>and<span
  class=\"w\"> </span>displayed.<span class=\"w\">  </span>A<span class=\"w\"> </span>section,<span
  class=\"w\"> </span><span class=\"k\">if</span><span class=\"w\"> </span>provided,<span
  class=\"w\"> </span>will<span class=\"w\"> </span>direct<span class=\"w\">  </span>man<span
  class=\"w\">  </span>to<span class=\"w\">  </span>look\n<span class=\"w\">       </span>only<span
  class=\"w\">  </span><span class=\"k\">in</span><span class=\"w\">  </span>that<span
  class=\"w\">  </span>section<span class=\"w\"> </span>of<span class=\"w\"> </span>the<span
  class=\"w\"> </span>manual.<span class=\"w\">  </span>The<span class=\"w\"> </span>default<span
  class=\"w\"> </span>action<span class=\"w\"> </span>is<span class=\"w\"> </span>to<span
  class=\"w\"> </span>search<span class=\"w\"> </span><span class=\"k\">in</span><span
  class=\"w\"> </span>all<span class=\"w\"> </span>of<span class=\"w\"> </span>the<span
  class=\"w\"> </span>available<span class=\"w\"> </span>sections<span class=\"w\">
  </span>following<span class=\"w\"> </span>a<span class=\"w\"> </span>pre-defined<span
  class=\"w\"> </span>order<span class=\"w\"> </span><span class=\"o\">(</span><span
  class=\"s2\">&quot;1 n l 8 3 2 3posix 3pm 3perl 3am 5 4 9 6 7&quot;</span><span
  class=\"w\"> </span>by<span class=\"w\"> </span>default,<span class=\"w\"> </span>unless<span
  class=\"w\"> </span>overridden<span class=\"w\"> </span>by<span class=\"w\"> </span>the<span
  class=\"w\"> </span>SECTION<span class=\"w\"> </span>directive<span class=\"w\">
  </span><span class=\"k\">in</span><span class=\"w\"> </span>/etc/manpath.config<span
  class=\"o\">)</span>,\n<span class=\"w\">       </span>and<span class=\"w\"> </span>to<span
  class=\"w\"> </span>show<span class=\"w\"> </span>only<span class=\"w\"> </span>the<span
  class=\"w\"> </span>first<span class=\"w\"> </span>page<span class=\"w\"> </span>found,<span
  class=\"w\"> </span>even<span class=\"w\"> </span><span class=\"k\">if</span><span
  class=\"w\"> </span>page<span class=\"w\"> </span>exists<span class=\"w\"> </span><span
  class=\"k\">in</span><span class=\"w\"> </span>several<span class=\"w\"> </span>sections.\n\n<span
  class=\"w\">       </span>The<span class=\"w\"> </span>table<span class=\"w\"> </span>below<span
  class=\"w\"> </span>shows<span class=\"w\"> </span>the<span class=\"w\"> </span>section<span
  class=\"w\"> </span>numbers<span class=\"w\"> </span>of<span class=\"w\"> </span>the<span
  class=\"w\"> </span>manual<span class=\"w\"> </span>followed<span class=\"w\"> </span>by<span
  class=\"w\"> </span>the<span class=\"w\"> </span>types<span class=\"w\"> </span>of<span
  class=\"w\"> </span>pages<span class=\"w\"> </span>they<span class=\"w\"> </span>contain.\n\n<span
  class=\"w\">       </span><span class=\"m\">1</span><span class=\"w\">   </span>Executable<span
  class=\"w\"> </span>programs<span class=\"w\"> </span>or<span class=\"w\"> </span>shell<span
  class=\"w\"> </span>commands\n<span class=\"w\">       </span><span class=\"m\">2</span><span
  class=\"w\">   </span>System<span class=\"w\"> </span>calls<span class=\"w\"> </span><span
  class=\"o\">(</span>functions<span class=\"w\"> </span>provided<span class=\"w\">
  </span>by<span class=\"w\"> </span>the<span class=\"w\"> </span>kernel<span class=\"o\">)</span>\n<span
  class=\"w\">       </span><span class=\"m\">3</span><span class=\"w\">   </span>Library<span
  class=\"w\"> </span>calls<span class=\"w\"> </span><span class=\"o\">(</span>functions<span
  class=\"w\"> </span>within<span class=\"w\"> </span>program<span class=\"w\"> </span>libraries<span
  class=\"o\">)</span>\n<span class=\"w\">       </span><span class=\"m\">4</span><span
  class=\"w\">   </span>Special<span class=\"w\"> </span>files<span class=\"w\"> </span><span
  class=\"o\">(</span>usually<span class=\"w\"> </span>found<span class=\"w\"> </span><span
  class=\"k\">in</span><span class=\"w\"> </span>/dev<span class=\"o\">)</span>\n<span
  class=\"w\">       </span><span class=\"m\">5</span><span class=\"w\">   </span>File<span
  class=\"w\"> </span>formats<span class=\"w\"> </span>and<span class=\"w\"> </span>conventions<span
  class=\"w\"> </span>eg<span class=\"w\"> </span>/etc/passwd\n<span class=\"w\">
  \      </span><span class=\"m\">6</span><span class=\"w\">   </span>Games\n<span
  class=\"w\">       </span><span class=\"m\">7</span><span class=\"w\">   </span>Miscellaneous<span
  class=\"w\"> </span><span class=\"o\">(</span>including<span class=\"w\"> </span>macro<span
  class=\"w\"> </span>packages<span class=\"w\"> </span>and<span class=\"w\"> </span>conventions<span
  class=\"o\">)</span>,<span class=\"w\"> </span>e.g.<span class=\"w\"> </span>man<span
  class=\"o\">(</span><span class=\"m\">7</span><span class=\"o\">)</span>,<span class=\"w\">
  </span>groff<span class=\"o\">(</span><span class=\"m\">7</span><span class=\"o\">)</span>\n<span
  class=\"w\">       </span><span class=\"m\">8</span><span class=\"w\">   </span>System<span
  class=\"w\"> </span>administration<span class=\"w\"> </span>commands<span class=\"w\">
  </span><span class=\"o\">(</span>usually<span class=\"w\"> </span>only<span class=\"w\">
  </span><span class=\"k\">for</span><span class=\"w\"> </span>root<span class=\"o\">)</span>\n<span
  class=\"w\">       </span><span class=\"m\">9</span><span class=\"w\">   </span>Kernel<span
  class=\"w\"> </span>routines<span class=\"w\"> </span><span class=\"o\">[</span>Non<span
  class=\"w\"> </span>standard<span class=\"o\">]</span>\n\n<span class=\"w\">       </span>A<span
  class=\"w\"> </span>manual<span class=\"w\"> </span>page<span class=\"w\"> </span>consists<span
  class=\"w\"> </span>of<span class=\"w\"> </span>several<span class=\"w\"> </span>sections.\n\n<span
  class=\"w\">       </span>Conventional<span class=\"w\"> </span>section<span class=\"w\">
  </span>names<span class=\"w\"> </span>include<span class=\"w\"> </span>NAME,<span
  class=\"w\"> </span>SYNOPSIS,<span class=\"w\"> </span>CONFIGURATION,<span class=\"w\">
  </span>DESCRIPTION,<span class=\"w\"> </span>OPTIONS,<span class=\"w\"> </span>EXIT<span
  class=\"w\"> </span>STATUS,<span class=\"w\"> </span>RETURN<span class=\"w\"> </span>VALUE,<span
  class=\"w\"> </span>ERRORS,<span class=\"w\"> </span>ENVIRONMENT,<span class=\"w\">
  </span>FILES,<span class=\"w\"> </span>VERSIONS,<span class=\"w\"> </span>CONFORMING<span
  class=\"w\"> </span>TO,<span class=\"w\"> </span>NOTES,<span class=\"w\"> </span>BUGS,<span
  class=\"w\"> </span>EXAMPLE,<span class=\"w\"> </span>AUTHORS,<span class=\"w\">
  </span>and<span class=\"w\"> </span>SEE<span class=\"w\"> </span>ALSO.\n\n<span
  class=\"w\">       </span>The<span class=\"w\"> </span>following<span class=\"w\">
  </span>conventions<span class=\"w\"> </span>apply<span class=\"w\"> </span>to<span
  class=\"w\"> </span>the<span class=\"w\"> </span>SYNOPSIS<span class=\"w\"> </span>section<span
  class=\"w\"> </span>and<span class=\"w\"> </span>can<span class=\"w\"> </span>be<span
  class=\"w\"> </span>used<span class=\"w\"> </span>as<span class=\"w\"> </span>a<span
  class=\"w\"> </span>guide<span class=\"w\"> </span><span class=\"k\">in</span><span
  class=\"w\"> </span>other<span class=\"w\"> </span>sections.\n\n<span class=\"w\">
  \      </span>bold<span class=\"w\"> </span>text<span class=\"w\">          </span><span
  class=\"nb\">type</span><span class=\"w\"> </span>exactly<span class=\"w\"> </span>as<span
  class=\"w\"> </span>shown.\n<span class=\"w\">       </span>italic<span class=\"w\">
  </span>text<span class=\"w\">        </span>replace<span class=\"w\"> </span>with<span
  class=\"w\"> </span>appropriate<span class=\"w\"> </span>argument.\n<span class=\"w\">
  \      </span><span class=\"o\">[</span>-abc<span class=\"o\">]</span><span class=\"w\">
  \            </span>any<span class=\"w\"> </span>or<span class=\"w\"> </span>all<span
  class=\"w\"> </span>arguments<span class=\"w\"> </span>within<span class=\"w\">
  </span><span class=\"o\">[</span><span class=\"w\"> </span><span class=\"o\">]</span><span
  class=\"w\"> </span>are<span class=\"w\"> </span>optional.\n<span class=\"w\">       </span>-a<span
  class=\"p\">|</span>-b<span class=\"w\">              </span>options<span class=\"w\">
  </span>delimited<span class=\"w\"> </span>by<span class=\"w\"> </span><span class=\"p\">|</span><span
  class=\"w\"> </span>cannot<span class=\"w\"> </span>be<span class=\"w\"> </span>used<span
  class=\"w\"> </span>together.\n<span class=\"w\">       </span>argument<span class=\"w\">
  </span>...<span class=\"w\">       </span>argument<span class=\"w\"> </span>is<span
  class=\"w\"> </span>repeatable.\n<span class=\"w\">       </span><span class=\"o\">[</span>expression<span
  class=\"o\">]</span><span class=\"w\"> </span>...<span class=\"w\">   </span>entire<span
  class=\"w\"> </span>expression<span class=\"w\"> </span>within<span class=\"w\">
  </span><span class=\"o\">[</span><span class=\"w\"> </span><span class=\"o\">]</span><span
  class=\"w\"> </span>is<span class=\"w\"> </span>repeatable.\n\n<span class=\"w\">
  \      </span>Exact<span class=\"w\"> </span>rendering<span class=\"w\"> </span>may<span
  class=\"w\"> </span>vary<span class=\"w\"> </span>depending<span class=\"w\"> </span>on<span
  class=\"w\"> </span>the<span class=\"w\"> </span>output<span class=\"w\"> </span>device.<span
  class=\"w\">  </span>For<span class=\"w\"> </span>instance,<span class=\"w\"> </span>man<span
  class=\"w\"> </span>will<span class=\"w\"> </span>usually<span class=\"w\"> </span>not<span
  class=\"w\"> </span>be<span class=\"w\"> </span>able<span class=\"w\"> </span>to<span
  class=\"w\"> </span>render<span class=\"w\"> </span>italics<span class=\"w\"> </span>when<span
  class=\"w\"> </span>running<span class=\"w\"> </span><span class=\"k\">in</span><span
  class=\"w\"> </span>a<span class=\"w\"> </span>terminal,<span class=\"w\"> </span>and<span
  class=\"w\"> </span>will<span class=\"w\"> </span>typically<span class=\"w\"> </span>use<span
  class=\"w\"> </span>underlined<span class=\"w\"> </span>or<span class=\"w\"> </span>coloured<span
  class=\"w\"> </span>text<span class=\"w\"> </span>instead.\n\n<span class=\"w\">
  \      </span>The<span class=\"w\"> </span><span class=\"nb\">command</span><span
  class=\"w\"> </span>or<span class=\"w\"> </span><span class=\"k\">function</span><span
  class=\"w\"> </span>illustration<span class=\"w\"> </span>is<span class=\"w\"> </span>a<span
  class=\"w\"> </span>pattern<span class=\"w\"> </span>that<span class=\"w\"> </span>should<span
  class=\"w\"> </span>match<span class=\"w\"> </span>all<span class=\"w\"> </span>possible<span
  class=\"w\"> </span>invocations.<span class=\"w\">  </span>In<span class=\"w\">
  </span>some<span class=\"w\"> </span>cases<span class=\"w\"> </span>it<span class=\"w\">
  </span>is<span class=\"w\"> </span>advisable<span class=\"w\"> </span>to<span class=\"w\">
  </span>illustrate<span class=\"w\"> </span>several<span class=\"w\"> </span>exclusive<span
  class=\"w\"> </span>invocations<span class=\"w\"> </span>as<span class=\"w\"> </span>is<span
  class=\"w\"> </span>shown<span class=\"w\"> </span><span class=\"k\">in</span><span
  class=\"w\"> </span>the<span class=\"w\"> </span>SYNOPSIS<span class=\"w\"> </span>section<span
  class=\"w\"> </span>of<span class=\"w\"> </span>this<span class=\"w\"> </span>manual<span
  class=\"w\"> </span>page.\n\nEXAMPLES\n<span class=\"w\">       </span>man<span
  class=\"w\"> </span>ls\n<span class=\"w\">           </span>Display<span class=\"w\">
  </span>the<span class=\"w\"> </span>manual<span class=\"w\"> </span>page<span class=\"w\">
  </span><span class=\"k\">for</span><span class=\"w\"> </span>the<span class=\"w\">
  </span>item<span class=\"w\"> </span><span class=\"o\">(</span>program<span class=\"o\">)</span><span
  class=\"w\"> </span>ls.\n\n<span class=\"w\">       </span>man<span class=\"w\">
  </span>man.7\n<span class=\"w\">           </span>Display<span class=\"w\"> </span>the<span
  class=\"w\"> </span>manual<span class=\"w\"> </span>page<span class=\"w\"> </span><span
  class=\"k\">for</span><span class=\"w\"> </span>macro<span class=\"w\"> </span>package<span
  class=\"w\"> </span>man<span class=\"w\"> </span>from<span class=\"w\"> </span>section<span
  class=\"w\"> </span><span class=\"m\">7</span>.\n</code></pre></div>\n<h2 id=\"but-what-if-you-dont\">But
  what if you don't?</h2>\n<p><code>cheat man</code></p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"c1\"># To convert a man page to pdf:</span>\nman<span class=\"w\"> </span>-t<span
  class=\"w\"> </span>bash<span class=\"w\"> </span><span class=\"p\">|</span><span
  class=\"w\"> </span>ps2pdf<span class=\"w\"> </span>-<span class=\"w\"> </span>bash.pdf\n\n<span
  class=\"c1\"># To view the ascii chart:</span>\nman<span class=\"w\"> </span><span
  class=\"m\">7</span><span class=\"w\"> </span>ascii\n</code></pre></div>\n<p>You
  get tiny examples to remind you of what you <strong>probably</strong> are trying
  to do!</p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n    :root {\n
  \     --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle: #83dcc8cc;\n
  \     --prevnext-subtitle-brightness: 3;\n    }\n    [data-theme=\"light\"] {\n
  \     --prevnext-color-text: #1f2022;\n      --prevnext-color-angle: #ffeb00;\n
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
  \   </style>\n\n    <a class='prev' href='/kvm-network-interface-via-nat-ubuntu-20'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>kvm-network-interface-via-nat-ubuntu-20</p>\n
  \       </div>\n    </a>\n\n    <a class='next' href='/reset-ssh-key-passphrase'>\n\n
  \       <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n
  \           <p class='prevnext-title'>Reset SSH key passphrase</p>\n        </div>\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5 15.75L14.25 12L10.5
  8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n  </div>"
jinja: false
long_description: 'man man man cheat man You get tiny examples to remind you of what
  you '
now: 2024-01-05 14:15:22.253898
path: pages/til/cheat-on-your-man.md
published: true
slug: cheat-on-your-man
super_description: 'man man man cheat man You get tiny examples to remind you of what
  you '
tags:
- linux
- cli
- tech
templateKey: til
title: cheat on your man
today: 2024-01-05
---

`man` can be a pain to read... and there's lots of alternatives out there and one I've just started playing with is [cheat](https://github.com/cheat/cheat)


`man man` will give you this plus a billion more lines of docs, which is useful when you need it...

```bash
MAN(1)                                                                                                                       Manual pager utils                                                                                                                      MAN(1)

NAME
       man - an interface to the on-line reference manuals

SYNOPSIS
       man  [-C  file]  [-d] [-D] [--warnings[=warnings]] [-R encoding] [-L locale] [-m system[,...]] [-M path] [-S list] [-e extension] [-i|-I] [--regex|--wildcard] [--names-only] [-a] [-u] [--no-subpages] [-P pager] [-r prompt] [-7] [-E encoding] [--no-hyphenation]
       [--no-justification] [-p string] [-t] [-T[device]] [-H[browser]] [-X[dpi]] [-Z] [[section] page[.section] ...] ...
       man -k [apropos options] regexp ...
       man -K [-w|-W] [-S list] [-i|-I] [--regex] [section] term ...
       man -f [whatis options] page ...
       man -l [-C file] [-d] [-D] [--warnings[=warnings]] [-R encoding] [-L locale] [-P pager] [-r prompt] [-7] [-E encoding] [-p string] [-t] [-T[device]] [-H[browser]] [-X[dpi]] [-Z] file ...
       man -w|-W [-C file] [-d] [-D] page ...
       man -c [-C file] [-d] [-D] page ...
       man [-?V]

DESCRIPTION
       man is the system's manual pager.  Each page argument given to man is normally the name of a program, utility or function.  The manual page associated with each of these arguments is then found and displayed.  A section, if provided, will direct  man  to  look
       only  in  that  section of the manual.  The default action is to search in all of the available sections following a pre-defined order ("1 n l 8 3 2 3posix 3pm 3perl 3am 5 4 9 6 7" by default, unless overridden by the SECTION directive in /etc/manpath.config),
       and to show only the first page found, even if page exists in several sections.

       The table below shows the section numbers of the manual followed by the types of pages they contain.

       1   Executable programs or shell commands
       2   System calls (functions provided by the kernel)
       3   Library calls (functions within program libraries)
       4   Special files (usually found in /dev)
       5   File formats and conventions eg /etc/passwd
       6   Games
       7   Miscellaneous (including macro packages and conventions), e.g. man(7), groff(7)
       8   System administration commands (usually only for root)
       9   Kernel routines [Non standard]

       A manual page consists of several sections.

       Conventional section names include NAME, SYNOPSIS, CONFIGURATION, DESCRIPTION, OPTIONS, EXIT STATUS, RETURN VALUE, ERRORS, ENVIRONMENT, FILES, VERSIONS, CONFORMING TO, NOTES, BUGS, EXAMPLE, AUTHORS, and SEE ALSO.

       The following conventions apply to the SYNOPSIS section and can be used as a guide in other sections.

       bold text          type exactly as shown.
       italic text        replace with appropriate argument.
       [-abc]             any or all arguments within [ ] are optional.
       -a|-b              options delimited by | cannot be used together.
       argument ...       argument is repeatable.
       [expression] ...   entire expression within [ ] is repeatable.

       Exact rendering may vary depending on the output device.  For instance, man will usually not be able to render italics when running in a terminal, and will typically use underlined or coloured text instead.

       The command or function illustration is a pattern that should match all possible invocations.  In some cases it is advisable to illustrate several exclusive invocations as is shown in the SYNOPSIS section of this manual page.

EXAMPLES
       man ls
           Display the manual page for the item (program) ls.

       man man.7
           Display the manual page for macro package man from section 7.
```


## But what if you don't?

`cheat man`

```bash
# To convert a man page to pdf:
man -t bash | ps2pdf - bash.pdf

# To view the ascii chart:
man 7 ascii
```

You get tiny examples to remind you of what you **probably** are trying to do!
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
    
    <a class='prev' href='/kvm-network-interface-via-nat-ubuntu-20'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>kvm-network-interface-via-nat-ubuntu-20</p>
        </div>
    </a>
    
    <a class='next' href='/reset-ssh-key-passphrase'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Reset SSH key passphrase</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>