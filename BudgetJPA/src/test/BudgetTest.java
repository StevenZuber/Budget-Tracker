package test;

import static org.junit.Assert.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Expense;

public class BudgetTest {

	private EntityManagerFactory emf;
	private EntityManager em;
	
	
	@Before
	public void setUp() throws Exception {
	        emf = Persistence.
	            createEntityManagerFactory("BudgetJPA");
	        em = emf.createEntityManager();
	}

	@Test
	public void test() throws Exception {
		Expense ex = em.find(Expense.class, 1);
		
		assertEquals(1, ex.getId());
		assertEquals("Phone Bill", ex.getName());
		
	}

	@After
	public void tearDown() {
		   em.close();
	        emf.close();	}


}
