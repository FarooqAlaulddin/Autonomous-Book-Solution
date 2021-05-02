package com.api.abs.book;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface bookRepository extends JpaRepository<book, Long> {

    Optional<book> findBookByISBN(Long ISBN);

    @Query("SELECT b FROM book b WHERE b.quantity > 0")
    List<book> findAvailableBooks();

    book findBookById(Long bookID);

    @Query(nativeQuery=true,value= "SELECT * FROM BOOK WHERE author=:authorName AND quantity>0")
    List<book> findByAuthor(String authorName);
    @Query(nativeQuery=true,value= "SELECT * FROM BOOK WHERE department=:dept AND quantity>0")
    List<book> findByDept(String dept);

    @Query(nativeQuery=true,value= "SELECT * FROM BOOK WHERE CONCAT(id, ' ', isbn, ' ', author, ' ', department, ' ', description, ' ', title, ' ', subtitle, ' ') LIKE %?1%")
    List<book> findByKeywords(String keywords);
}
