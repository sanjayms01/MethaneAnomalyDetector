class PatternPrint:
	'''Class to define function to print messages'''

	def upwardTriangle(self, n):
		for i in range(n):
			for j in range(i,n):
				print(" ",end=" ")

			for j in range(i+1):
				print("*", end=" ")

			print()

	def downTriangle(self, n):
		for i in range(n):
			for j in range(i + 1):
				print(" ",end=" ")

			for j in range(i, n):
				print("*", end=" ")
			print()


	def printDiamond(self, msg):
		''' Prints an asterisk diamond with message in between'''
		print()
		print()
		self.upwardTriangle(10)
		print(f"     {msg}")
		self.downTriangle(10)