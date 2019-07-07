# Redis 支持的5种数据结构
* string（字符串）

    string是最简单的类型，你可以理解成与Memcached一模一样的类型，一个key对应一个value，其上支持的操作与Memcached的操作类似。但它的功能更丰富。

* list(双向链表)

    list是一个链表结构，主要功能是push、pop、获取一个范围的所有值等等。之所以说它是双向的，因为它可以在链表左，右两边分别操作

* dict(hash表)

    set是集合，和我们数学中的集合概念相似，对集合的操作有添加删除元素，有对多个集合求交并差等操作。操作中key理解为集合的名字

* zset(排序set)

    zset是set的一个升级版本，他在set的基础上增加了一个顺序属性，这一属性在添加修改元素的时候可以指定，每次指定后，zset会自动重新按新的值调整顺序。 可以对指定键的值进行排序权重的设定，它应用排名模块比较多

* Hash类型
    
    Redis能够存储key对多个属性的数据（比如user1.uname user1.passwd），当然，你完成可以把这些属性以json格式进行存储，直接把它当作string类型进行操作，但这样性能上是对影响的，所以redis提出的Hash类型。


* nginx 服务器重启命令，关闭
* nginx -s reload ：修改配置后重新加载生效
* nginx -s reopen ：重新打开日志文件
* nginx -t -c /path/to/nginx.conf 测试nginx配置文件是否正确
* 关闭nginx：
* nginx -s stop :快速停止nginx
* quit ：完整有序的停止nginx