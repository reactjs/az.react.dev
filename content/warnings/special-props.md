---
title: Xüsusi Proplar Xəbərdarlığı
layout: single
permalink: warnings/special-props.html
---

JSX elementində olan propların əksəriyyəti komponentə göndərilir. Lakin, React tərəfindən işlədilən iki xüsusi prop (`ref` və `key`) komponentə yönləndirilmir.

Məsələn, komponentdən `this.props.key`-i oxumaq (i.e., render funksiyası və ya [propTypes-dan](/docs/typechecking-with-proptypes.html#proptypes)) təyin edilməyib. Əgər sizə eyni dəyəri uşaq komponentdən oxumaq lazımdırsa bu dəyəri komponentə əlavə prop ilə (məsələn: `<ListItemWrapper key={result.id} id={result.id} />`) göndərin. Bu, lazımsız görünə bilər. Lakin, applikasiya məntiqini rekonsilyasiya işarələrindən ayırmaq vacibdir.
