package client;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import entities.Expense;



public class ExpenseClient {

	public static void main(String[] args) {

		EntityManagerFactory emf = Persistence.createEntityManagerFactory("BudgetJPA");
		EntityManager em = emf.createEntityManager();
		Expense expense = em.find(Expense.class, 1);
		System.out.println(expense);
		em.close();
		emf.close();
	}
}
